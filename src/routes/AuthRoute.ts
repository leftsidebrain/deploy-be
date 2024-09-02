import { Router } from "express";
import * as authController from "../controllers/AuthController";
import auth from "../middlewares/authorization";
import { upload } from "../middlewares/fileUpload";
const authRoute = Router();

authRoute.post("/login", authController.login);

authRoute.post("/register", upload.single("profile_pic"), authController.register);
authRoute.get("/me", auth, authController.checkAuth);

export default authRoute;
