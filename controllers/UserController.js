import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarURL: req.body.avatarURL,
        passwordHashed: passwordHash,
      });
      const user = await doc.save();
      const token = jwt.sign(
        {
          _id: user._id,
        },
        "jwtSecret",
        { expiresIn: "30d" }
      );
      const { passwordHashed, ...userData } = user._doc;
      return res.json({
        ...userData,
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      message: "Failed to register",
    });
  }
};
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Login incorrect",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHashed
    );
    if (!isValidPassword) {
      return res.status(404).json({
        message: "Login or password incorrect",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "jwtSecret",
      { expiresIn: "30d" }
    );
    res.status(200).json({
      message: "Excelent!",
      login: user._doc,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(300).json({
      message: "Failed to login",
    });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "There is a token, but there is no user",
      });
    }

    const { passwordHashed, ...userData } = user._doc;
    return res.status(200).json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error",
    });
  }
};
