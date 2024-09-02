import { Router } from "express";
import * as postController from "../controllers/PostController";
import auth from "../middlewares/authorization";
import { uploadCloudinary } from "../middlewares/uploadCloud";
import { upload } from "../middlewares/uploadFile";
const postRoute = Router();

postRoute.get("/", postController.findAll);

postRoute.get("/:id", postController.findById);
postRoute.get("/detail/:id", postController.findByOne);
postRoute.get("/media/:id", postController.findAllUser);

postRoute.post("/", auth,upload.array("files"), uploadCloudinary, postController.create);

postRoute.put("/:id", postController.update);

postRoute.delete("/:id", postController.remove);

export default postRoute;
