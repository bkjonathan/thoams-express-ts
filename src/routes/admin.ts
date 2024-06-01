import express from "express";
import {Utils} from "../utils/utils";
import {AdminController} from "../controllers/admin.controller";

const router = express.Router();
const utils = new Utils();
utils.addInterceptor(router, utils.getFileName(__filename, __dirname));

router.get("/",AdminController.getAdmin);

export default router;