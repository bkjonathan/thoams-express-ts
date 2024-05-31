import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import morganLogger from 'morgan';
import {Utils} from "./utils/utils";
import container from "./libs/container";
import {getService} from "./libs/ioc.utils";

const app = express();

const router = express.Router();


// Get an instance of the Utils class from the IoC container
const util = getService<Utils>(Utils.name);

app.set('trust proxy', true);
app.use(cors());
app.use(morganLogger('dev'));

app.use(express.json());
app.use(router);
util.setupRoutes(router);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


export default app;