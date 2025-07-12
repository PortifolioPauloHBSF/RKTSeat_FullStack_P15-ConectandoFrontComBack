// src/services/UserService.ts
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";
import { UserRole } from "@/generated/prisma";

interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export class UserService {
    async createUser({ name, email, password, role }: CreateUserDTO) {
        const userExists = await prisma.user.findFirst({ where: { email } });
        if (userExists) {
            throw new AppError("Email already in use.");
        }

        const hashedPassword = await hash(password, 8);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
    }
}
