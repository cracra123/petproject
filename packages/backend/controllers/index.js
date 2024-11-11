import AuthController from "./auth_controller.js";
import CommentController from "./comment_controller.js";
import FollowController from "./follow_controller.js";
import LikeController from "./like_controller.js";
import { PostController } from "./post_controller.js";
import SearchController from "./search_controller.js";
import { UploadsController } from "./uploads_controller.js";

import { Router } from "express";

const router = Router();

router.use("/auth", AuthController);
router.use("/post", PostController);
router.use("/uploads", UploadsController);
router.use("/like", LikeController);
router.use("/comment", CommentController);
router.use("/follow", FollowController);
router.use("/search", SearchController);
export default router;
