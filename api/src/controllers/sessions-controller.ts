import { SessionsService } from "@/services/sessions-service";
import { Request, Response } from "express";
import { z } from "zod";

class SessionController {
    private sessionServices = new SessionsService()

    create = async (request: Request, response: Response) => {
        const bodySchema = z.object({
            email: z.string().trim().email('Invalid email!').toLowerCase(),
            password: z.string()
        })
        const { email, password } = bodySchema.parse(request.body)
        const userData = await this.sessionServices.checkCredentials({ email, password })

        response.json(userData);
    };
}

export { SessionController };
