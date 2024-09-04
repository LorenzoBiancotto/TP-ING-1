import { Request, Response } from "express";

export default function notFound(req: Request, res: Response): Response<any, Record<string, any>> {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} dosent Exist`);
    return res.status(400).json({ message: `${req.protocol}://${req.get('host')}${req.originalUrl} dosent Exist` });
}