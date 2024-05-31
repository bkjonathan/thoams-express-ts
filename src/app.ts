import dotenv from "dotenv";
dotenv.config();

import express from "express";
import * as http from "http";
import cors from 'cors';
import morganLogger from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

const router = express.Router();

app.set('trust proxy', true);
app.use(cors());
app.use(morganLogger('dev'));

app.use(express.json());
app.use(router);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;