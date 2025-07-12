import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { RefundService } from "@/services/refunds-service";

export const CategoriesEnum = z.enum(Object.values(Category) as [string, ...string[]]);

class RefundsController {
    private refundService = new RefundService();

    create = async (request: Request, response: Response): Promise<any> => {
        const bodySchema = z.object({
            name: z.string().trim().min(1, { message: "Inform refund name" }),
            category: CategoriesEnum,
            amount: z.number().positive({ message: "Value must be positive." }),
            filename: z.string(),
        });

        if (!request.user?.id) {
            throw new AppError("Unauthorized", 401);
        }

        const { name, category, amount, filename } = bodySchema.parse(request.body);
        const userId = request.user.id;

        const refund = await this.refundService.createRefund({
            name,
            category: category as Category,
            amount,
            filename,
            userId,
        });

        response.status(201).json(refund);
    };

    index = async (request: Request, response: Response): Promise<any> => {
        const querySchema = z.object({
            name: z.string().optional().default(""),
            page: z.coerce.number().optional().default(1),
            perPage: z.coerce.number().max(30).optional().default(10),
        });
        const { name, page, perPage } = querySchema.parse(request.query);

        const refunds = await this.refundService.listRefunds({
            userName: name,
            page,
            perPage,
        });
        return response.json({ refunds });
    };

    show = async (request: Request, response: Response): Promise<any> => {
        const paramsSchema = z.object({
            id: z.string().ulid(),
        });

        const { id } = paramsSchema.parse(request.params);
        const refund = await this.refundService.retrieveRefund({ id });

        response.json(refund);
    };
}

export { RefundsController };
