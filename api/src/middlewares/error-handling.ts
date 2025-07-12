import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandling: ErrorRequestHandler = (
    error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });
        return;
    }

    if (error instanceof ZodError) {
        response.status(400).json({
            message: "validation error",
            issues: error.format(),
        });
        return;
    }
    response.status(500).json({ message: error.message });
    return;
};
