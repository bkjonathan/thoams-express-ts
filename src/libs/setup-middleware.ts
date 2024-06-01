import express, {Express, Router} from "express";
import cors from "cors";
import morganLogger from "morgan";
import path from "path";
import fs from "fs";

export function setupMiddleware(app: Express,router:Router): void {
  app.use(cors());
  app.use(morganLogger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const middlewaresDir = path.join(__dirname, '../middlewares');
  fs.readdirSync(middlewaresDir).forEach(file => {
    const middlewarePath = path.join(middlewaresDir, file);

    if (fs.lstatSync(middlewarePath).isFile()) {
      const middleware = require(middlewarePath);
      if (typeof middleware.default === 'function') {
        app.use(middleware.default);
      } else {
        console.warn(`The module '${middlewarePath}' does not export a function and will not be used as middleware.`);
      }
    }
  });


  app.use(router);
  // app.use(cookieParser());
  // app.use(helmet());
  // app.use(compression());


}