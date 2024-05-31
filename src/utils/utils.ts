import moment from 'moment';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import crypto from 'crypto';

const SHORT_PATTERN_OF_DATE = 'DD-MM-YYYY';
const FULL_PATTERN_OF_DATE = 'DD-MM-YYYY HH:mm:ss';
const MIN_LENGTH_CARD_CODE_SERIAL = 6;
const MAX_LENGTH_CARD_CODE_SERIAL = 10;

export class Utils {
    isValidDate(dateAsString: string): boolean {
        return moment(dateAsString, SHORT_PATTERN_OF_DATE, true).isValid();
    }

    isValidEmail(email: string): boolean {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isValidCodeSerialLength(value: string): boolean {
        const strLength = value.length;
        if (strLength < MIN_LENGTH_CARD_CODE_SERIAL || strLength > MAX_LENGTH_CARD_CODE_SERIAL) {
            return false;
        }
        return true;
    }

    startOfWeek(): Date {
        return moment().startOf('isoWeek').toDate();
    }

    startOfMonth(): Date {
        return moment().startOf('month').toDate();
    }

    stringToStartDayDateTimeUTC(dateAsString: string): moment.Moment {
        return moment.utc(dateAsString, SHORT_PATTERN_OF_DATE, true).startOf('day');
    }

    stringToEndDayDateTimeUTC(dateAsString: string): moment.Moment {
        return moment.utc(dateAsString, SHORT_PATTERN_OF_DATE, true).endOf('day');
    }

    stringToStartDayDateTimeUTCSubtract7(dateAsString: string): moment.Moment {
        return moment.utc(dateAsString, SHORT_PATTERN_OF_DATE, true).startOf('day').subtract(7, 'hours');
    }

    stringToEndDayDateTimeUTCSubtract7(dateAsString: string): moment.Moment {
        return moment.utc(dateAsString, SHORT_PATTERN_OF_DATE, true).endOf('day').subtract(7, 'hours');
    }

    currentDayStartDateTimeUTC(): moment.Moment {
        return moment.utc().startOf('day');
    }

    currentDayEndDateTimeUTC(): moment.Moment {
        return moment.utc().endOf('day');
    }

    currentDayStartDateTimeSubtract(timeZone = 0): moment.Moment {
        return moment.utc().startOf('day').subtract(timeZone, 'hours');
    }

    currentDayEndDateTimeSubtract(timeZone = 0): moment.Moment {
        return moment.utc().endOf('day').subtract(timeZone, 'hours');
    }

    reFormat(dateAsString: string): string {
        return moment(dateAsString).utc().format(SHORT_PATTERN_OF_DATE);
    }

    reFormatFullDate(dateAsString: string, pattern = FULL_PATTERN_OF_DATE): string {
        return moment(dateAsString).utc().format(pattern);
    }

    parseBool(value: string): boolean {
        return Boolean((value || '').replace(/\s*(false|null|undefined|0)\s*/i, ''));
    }

    walkDir(dirPath: string): string[] {
        let files = fs.readdirSync(dirPath);
        _.remove(files, function (file) {
            return file.indexOf('.') === 0;
        });

        const dirs = _.remove(files, function (file) {
            return fs.statSync(path.join(dirPath, file)).isDirectory();
        });

        files = files.map(function (file) {
            return path.join(dirPath, file);
        });

        dirs.forEach((dir) => {
            files.push.apply(files, this.walkDir(path.join(dirPath, dir)));
        }, this);

        return files;
    }

    setupJobs(): void {
        this.walkDir('./jobs').forEach(function (file) {
            const job = require('../' + file).default;
            job.run();
        });
    }

    getFileName(filename: string, dirname: string): string {
        return filename.slice(dirname.length + 1);
    }

    addInterceptor(router: any, path: string): void {
        path = `../hook/${process.env.PROJECT}/${path}`;
        try {
            const handlers = require(path);
            Object.keys(handlers).map((handler) => {
                router.use(handlers[handler]);
            });
        } catch (err) {
            //Commentary to fill the empty block
        }
    }

    setupRoutes(app: any): void {
        const routePath = path.join(__dirname, '../routes');
        console.log('routePath', routePath)
        this.walkDir(routePath).map(function (file) {
            const router = require(file).default;
            const fileName = path.parse(file).name;
            app.use('/' + fileName, router);
        });
    }

    encryptText(text: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes256', process.env.ENCRYPTION_KEY!, iv);
        return iv.toString('hex') + ':' + cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
    }

    compareTextIgnoreCase(textOrigin: string, textSearch: string): boolean {
        return textOrigin.toLowerCase().includes(textSearch.toLowerCase());
    }

    getRandomString(length: number, isNumber: boolean): string {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        if (isNumber) {
            characters = '0123456789';
        }
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    hideString(string: string, prefixLength = 3, suffixLength = 0, char = '*'): string {
        if (string == null || string.length < 1) {
            return string;
        }
        if (string.length <= prefixLength + suffixLength) {
            return '*'.repeat(string.length);
        }
        return (
            string.substring(0, prefixLength) + '*'.repeat(string.length - prefixLength - suffixLength) + string.substring(string.length - suffixLength)
        );
    }

    hideEmail(string: string, prefixLength = 3, char = '*'): string {
        if (string == null || string.length < 1) {
            return string;
        }
        const newString = string.split('@');
        return this.hideString(newString[0], prefixLength, 0, char).concat('@').concat(newString[1]);
    }
}