import { uploadPicture } from "../middleware/uploadPicture";
import User from "../models/User";
import { fileRemover } from "../utils/fileRemover";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check whether the user exists or not
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password,
      });

      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("User has already registered");
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }
    const isMatched = await user.comparePassword(password);

    if (isMatched) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      let error = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      let error = new Error("Profile update failed!!!");
      error.statusCode = 404;
      next(error);
    }

    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;

    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password must be al least 6 character");
    } else {
      user.password = req.body.password || user.password;
    }

    const updatedUserProfile = user.save();
    return res.status(201).json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    let err = new Error("Somthing went wrong. Profile updation failed!!");
    return next(error);
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async (err) => {
      if (err) {
        next(new Error("An error occurred during the upload: " + err.message));
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        let err = new Error("User not found");
        err.statusCode = 404;
        next(err);
      }
      if (user.avatar) {
        fileRemover(user.avatar);
      }
      user.avatar = req.file ? req.file.filename : "";

      await user.save();

      res.status(200).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    });
  } catch (error) {
    next(error);
  }
};
