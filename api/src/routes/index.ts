import { Router } from "express";
import { usersRoute } from "./users-routes";
import { sessionRoutes } from "./session-routes";
import { refundsRoutes } from "./refunds-routes";
import { uploadsRoutes } from "./uploads-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import multer from "multer";


const routes = Router();

// Rotas Públicas
routes.use("/users", usersRoute);
routes.use("/sessions", sessionRoutes);

// Rotas privadas
routes.use(ensureAuthenticated);
routes.use("/refunds", refundsRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };
