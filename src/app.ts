import dotenv from "dotenv";
dotenv.config();

import express from "express";
import * as http from "http";
import cors from 'cors';
import morganLogger from 'morgan';
import {Utils} from "./utils/utils";
import Container from "./libs/ioc-container";

const app = express();
const port = process.env.PORT || 3000;

const router = express.Router();

// Create an instance of the IoC container
const container = new Container();


// Register the Utils class with the IoC container
container.register('Utils', new Utils());

// Get an instance of the Utils class from the IoC container
const util = container.get('Utils') as Utils;

app.set('trust proxy', true);
app.use(cors());
app.use(morganLogger('dev'));

app.use(express.json());
app.use(router);
util.setupRoutes(router);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;