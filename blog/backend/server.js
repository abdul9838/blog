import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorResponserHandler } from "./middleware/errorHandler";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import path from "path";

const server = express();
dotenv.config();

connectDB();
server.use(cors());
server.use(express.json());

// user routers
server.use("/api/users/", userRouter);
server.use("/api/posts/", postRouter);

// static middleware for image
server.use("/uploads", express.static(path.join(__dirname, "/uploads")));

server.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
