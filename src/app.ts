import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { Utils } from './utils/utils';
import { getContainer } from './libs/ioc.utils';
import { setupMiddleware } from './libs/setup-middleware';
import connectMongo from './libs/connect-mongo';

const app = express();
connectMongo();

const router = express.Router();

// Get an instance of the Utils class from the IoC container
const util = getContainer<Utils>(Utils.name);

app.set('trust proxy', true);
setupMiddleware(app, router);
util.setupRoutes(router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
