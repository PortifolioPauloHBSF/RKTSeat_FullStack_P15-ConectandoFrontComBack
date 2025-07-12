import { prisma } from "@/database/prisma";
import { Category } from "@prisma/client";

interface CreateRefundsDTO {
    name: string;
    category: Category;
    amount: number;
    filename: string;
    userId: string;
}

interface ListRefundsDTO {
    userName: string;
    page: number;
    perPage: number;
}

interface retrieveRefundDTOP {
    id: string;
}

export class RefundService {
    async createRefund({ name, category, amount, filename, userId }: CreateRefundsDTO) {
        const refund = await prisma.refunds.create({
            data: {
                name,
                category,
                amount,
                filename,
                userId,
            },
        });
        return refund;
    }

    async listRefunds({ userName, page = 1, perPage = 10 }: ListRefundsDTO) {
        const skip = (page - 1) * perPage;
        const refunds = await prisma.refunds.findMany({
            skip,
            take: perPage,
            where: {
                user: {
                    name: {
                        contains: userName.trim(),
                    },
                },
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const totalRecords = await prisma.refunds.count({
            where: {
                user: {
                    name: {
                        contains: userName.trim(),
                    },
                },
            },
        });
        const totalPages = Math.ceil(totalRecords / perPage);
        return {
            refunds,
            pagination: {
                page,
                perPage,
                totalRecords,
                totalPages: totalPages > 0 ? totalPages : 1,
            },
        };
    }

    async retrieveRefund({ id }: retrieveRefundDTOP) {
        const refund = await prisma.refunds.findFirst({
            where: { id },
            include: {
                user: {
                    select: { name: true, email: true },
                },
            },
        });
        return refund
    }
}
