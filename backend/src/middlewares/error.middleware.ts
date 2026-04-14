import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message } = err;

    if (!(err instanceof ApiError)) {
        statusCode = statusCode || 500;
        message = message || "Internal Server Error";
    }

    const response = {
        success: false,
        statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    res.status(statusCode).json(response);
};

export { errorMiddleware };
