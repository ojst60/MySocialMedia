import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute";
import { addPost, getPost } from "../controllers/post";

const postRouter = Router();

postRouter.route("/").post(protectRoute, addPost);

postRouter.route("/:userId").get(protectRoute, getPost);

export default postRouter;
