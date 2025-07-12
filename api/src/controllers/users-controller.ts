import { Request, Response } from "express";
import { UserRole } from "@/generated/prisma";
import { z } from "zod";
import { UserService } from "@/services/user-service";


class UserController {
    private userService = new UserService()

    create = async (request: Request, response: Response) => {
        const bodySchema = z.object({
            name: z.string().trim().min(2, { message: "Name too short!" }),
            email: z.string().trim().email({ message: "Invalid email!" }).toLowerCase(),
            password: z.string().min(6, { message: "password must have at least 6 characters" }),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee),
        });

        const { name, email, password, role } = bodySchema.parse(request.body);
        await this.userService.createUser({ name, email, password, role })
        response.status(201).json({ message: "User successfully created" });
    };
}

export { UserController };
