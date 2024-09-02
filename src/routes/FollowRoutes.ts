import { Router } from "express";
import * as followController from "../controllers/FollowController";
const followRoute = Router();

followRoute.post("/", followController.follow);
followRoute.post("/unfollow", followController.unfollow);
followRoute.post("/check", followController.checkFollow);

export default followRoute;
