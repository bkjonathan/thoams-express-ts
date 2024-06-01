import { Request, Response, NextFunction } from 'express';

export default function example(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url} from middleware example`);
    next();
}