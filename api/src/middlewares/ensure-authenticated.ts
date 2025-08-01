import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction, response } from "express";

interface TokenPayload {
    role: string;
    sub: string;
}

function ensureAuthenticated(request: Request, Response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AppError("JWT token not found!", 401);
        }
        const [, token] = authHeader.split(" ");
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload;

        request.user = {
            id: user_id,
            role,
        };

        return next();
    } catch (error) {
        throw new AppError("Invalid JWT Token!", 401);
    }
}

export { ensureAuthenticated };
