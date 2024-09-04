import mongoose from "mongoose";
import { Request, Response } from "express";

export class CustomError extends Error {

    public statusCode: number;

    constructor(statusCode: number, errorMessage: string) {
        super(errorMessage);
        this.statusCode = statusCode;
    };
};

export const errorHandler = (err: CustomError | mongoose.Error.ValidationError | undefined, req: Request, res: Response, next: any): any => {
    if (err instanceof CustomError) {
        return res.status(200).json({ code: err.statusCode, message: err.message });
    } else if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: err.message });
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }
};