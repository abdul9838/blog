import { uploadPicture } from "../middleware/uploadPicture";
import Post from "../models/Post";
import { fileRemover } from "../utils/fileRemover";

export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: "sample title",
      caption: "sample caption",
      slug: "sample slug",
      body: "sample body",
      photo: "sample photo",
      user: req.user._id,
    });

    await post.save();
    return res.json({ post: post });
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
