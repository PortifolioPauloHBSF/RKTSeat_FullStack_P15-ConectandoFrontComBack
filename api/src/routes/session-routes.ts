import { Router } from "express";
import { SessionController } from "@/controllers/sessions-controller";

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post("/", sessionController.create);

export { sessionRoutes };
