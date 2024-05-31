import dotenv from "dotenv";
dotenv.config();

import express from "express";
import * as http from "http";
import cors from 'cors';
import morganLogger from 'morgan';
import {Utils} from "./utils/utils";

const app = express();
const port = process.env.PORT || 3000;

const router = express.Router();
const util = new Utils()


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