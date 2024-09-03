import { Router } from "express";
import * as userController from "../controllers/UserController";
import { uploadCloudinary } from "../middlewares/uploadCloud";
import { upload } from "../middlewares/uploadFile";

const userRoute = Router();

userRoute.post("/", userController.findAll);

userRoute.get("/search/:query", userController.findInput);

userRoute.get("/:id", userController.findById);

userRoute.patch("/:id", upload.single("file"), uploadCloudinary, userController.update);

userRoute.delete("/:id", userController.remove);

userRoute.get("/follows/:id", userController.countFoll);

userRoute.get("/follower/:id", userController.userFollower);
userRoute.get("/following/:id", userController.userFollowing);

export default userRoute;
