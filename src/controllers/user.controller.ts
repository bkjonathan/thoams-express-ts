import { Request, Response } from 'express';
export class UserController {
  static createUser(req: Request, res: Response) {
    res.send('Hello Admin!');
  }
  static async getUser(req: Request, res: Response) {
    res.send('Hello Admin!');
  }
}
