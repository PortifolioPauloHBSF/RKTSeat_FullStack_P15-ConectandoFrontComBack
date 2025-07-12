import { Router } from "express";
import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthroization } from "@/middlewares/verify-user-authorization";
import multer from "multer";
import uploadConfig from "@/configs/upload";


const uploadsRoutes = Router();
const uploadsController = new UploadsController();

const upload = multer(
    uploadConfig.MULTER,
)

uploadsRoutes.use(verifyUserAuthroization(["employee"]));
uploadsRoutes.post("/", upload.single("file"), uploadsController.create);

export { uploadsRoutes };
