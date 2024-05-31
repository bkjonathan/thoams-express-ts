import express from "express";
import {Utils} from "../utils/utils";

const router = express.Router();
const utils = new Utils();
utils.addInterceptor(router, utils.getFileName(__filename, __dirname));

router.get("/", (req, res) => {
    res.send("Hello Admin!");
});

export default router;