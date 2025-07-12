import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthroization } from "@/middlewares/verify-user-authorization";

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.post(
    "/",
    verifyUserAuthroization(['employee']),
    refundsController.create
);

refundsRoutes.get(
    "/",
    verifyUserAuthroization(['manager']),
    refundsController.index
)

refundsRoutes.get(
    "/:id",
    verifyUserAuthroization(['employee', 'manager']),
    refundsController.show
)

export { refundsRoutes };
