import { Router } from "express";
import * as likeController from "../controllers/LikeController";
const likeRoute = Router();

likeRoute.post("/:postId", likeController.like);
likeRoute.delete("/unlike/:postId", likeController.unlike);
likeRoute.get("/count/:postId", likeController.countLike);
likeRoute.post("/check/:postId", likeController.checkLike);

export default likeRoute;
