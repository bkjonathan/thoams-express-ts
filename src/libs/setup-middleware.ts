import express, {Express, Router} from "express";
import cors from "cors";
import morganLogger from "morgan";

export function setupMiddleware(app: Express,router:Router): void {
  app.use(cors());
  app.use(morganLogger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(router);
  // app.use(cookieParser());
  // app.use(helmet());
  // app.use(compression());


}