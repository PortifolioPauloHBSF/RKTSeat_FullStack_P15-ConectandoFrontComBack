// src/services/UserService.ts
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

interface CreateSessionDTO {
    email: string;
    password: string;
}

export class SessionsService {
    async checkCredentials({ email, password }: CreateSessionDTO) {
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw new AppError("Email or password invalid!", 401);
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Email or password invalid!", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({ role: user.role }, secret, {
            subject: user.id,
            expiresIn,
        });

        const { password: _, ...userWithoutPassword } = user

        return { token, user: userWithoutPassword };
    }
}
