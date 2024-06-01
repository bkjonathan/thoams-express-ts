import { Request, Response } from "express";
export class AdminController{
    static async getAdmin(req:Request, res:Response){
        res.send("Hello Admin!");
    }
}