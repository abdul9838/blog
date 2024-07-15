import { verify } from "jsonwebtoken";
import User from "../models/User";

export const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      let err = new Error("Not authorized, token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, no token");
    error.statusCode = 401;
    next(error);
  }
};

export const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error("Not authorized as an admin");
    error.statusCode = 401;
    next(error);
  }
};
