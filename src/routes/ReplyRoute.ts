import { Router } from "express";
import * as replyController from "../controllers/ReplyController";
import auth from "../middlewares/authorization";
import { uploadCloudinary } from "../middlewares/uploadCloud";
import { upload } from "../middlewares/uploadFile";
const replyRoute = Router();

replyRoute.get("/", replyController.findAll);

replyRoute.get("/:id", replyController.findById);
replyRoute.get("/detail/:id", replyController.findByOne);

replyRoute.post("/:post_id", auth,upload.array("files"), uploadCloudinary, replyController.create);

replyRoute.put("/:id", replyController.update);

replyRoute.delete("/:id", replyController.remove);

export default replyRoute;
