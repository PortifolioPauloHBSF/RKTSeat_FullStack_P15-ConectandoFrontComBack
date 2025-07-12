import { Router } from "express";
import { UserController } from "@/controllers/users-controller";

const usersRoute = Router();
const userController = new UserController();

usersRoute.post("/", userController.create);

export { usersRoute }