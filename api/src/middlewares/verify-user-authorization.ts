import { Request, Response, NextFunction, request } from "express";
import { AppError } from "@/utils/AppError";

// ["manager", "employee"]

function verifyUserAuthroization(role: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user || !role.includes(request.user.role)) {
            throw new AppError("Unauthorized", 401);
        }
        next();
    };
}

export { verifyUserAuthroization };
