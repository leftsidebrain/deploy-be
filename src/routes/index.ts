import postRoute from "./PostRoute";
import authRoute from "./AuthRoute";
import { Router } from "express";
import replyRoute from "./ReplyRoute";
import likeRoute from "./likeRoutes";
import userRoute from "./UserRoute";
import followRoute from "./FollowRoutes";
const route = Router();

route.use("/posts", postRoute);
route.use("/auth", authRoute);
route.use("/reply", replyRoute);
route.use("/like", likeRoute);
route.use("/users", userRoute);
route.use("/follow", followRoute);

export default route;
