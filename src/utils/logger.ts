import winston, { Logger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const transport = new DailyRotateFile({
    filename: 'logs/logging-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const logger: Logger = winston.createLogger({
    format: format.combine(
        format.splat(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf((log) => {
            if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
            return `[${log.timestamp}] [${log.level}] ${log.message}`;
        })
    ),
    transports: [new transports.Console(), transport],
});

export default logger;