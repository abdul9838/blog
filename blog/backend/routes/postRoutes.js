import { Router } from "express";
import { createPost } from "../controllers/postControllers";
import { authGuard } from "../middleware/userAuth";

const route = Router();

route.post("/", authGuard, createPost);

export default route;
