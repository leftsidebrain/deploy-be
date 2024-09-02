import { Router } from "express";
import * as postController from "../controllers/PostController";
import auth from "../middlewares/authorization";
import { upload } from "../middlewares/fileUpload";
const postRoute = Router();

postRoute.get("/", postController.findAll);

postRoute.get("/:id", postController.findById);
postRoute.get("/detail/:id", postController.findByOne);
postRoute.get("/media/:id", postController.findAllUser);

postRoute.post("/", auth, upload.array("images"), postController.create);

postRoute.put("/:id", postController.update);

postRoute.delete("/:id", postController.remove);

export default postRoute;
