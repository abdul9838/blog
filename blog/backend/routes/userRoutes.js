import express from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
  updateProfilePicture,
  userProfile,
} from "../controllers/userControllers";
import { authGuard } from "../middleware/userAuth";

const userRouter = express.Router();

userRouter
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/profile", authGuard, userProfile)
  .put("/updateProfile", authGuard, updateProfile)
  .put("/updateProfilePicture", authGuard, updateProfilePicture);

export default userRouter;
