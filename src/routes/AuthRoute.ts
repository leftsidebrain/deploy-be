import { Router } from "express";
import * as authController from "../controllers/AuthController";
import auth from "../middlewares/authorization";
import { uploadCloudinary } from "../middlewares/uploadCloud";
import { upload } from "../middlewares/uploadFile";
const authRoute = Router();

authRoute.post("/login", authController.login);

authRoute.post("/register", authController.register);
authRoute.get("/me", auth, authController.checkAuth);

export default authRoute;
