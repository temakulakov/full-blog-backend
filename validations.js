import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must been min 5 symbols").isLength({ min: 5 }),
  body("fullName", "Enter name").isLength({ min: 2 }),
  body("avatarURL", "Don't correct link").optional().isURL(),
];

export const loginValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must been min 5 symbols").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Enter title of post").isLength({ min: 4 }).isString(),
  body("text", "Enter text of post").isLength({ min: 10 }).isString(),
  body("tags", "Don't correct format of tags").optional().isString(),
  body("imageURL", "Don't correct link").optional().isURL(),
  body("user", "Don't correct user").isString(),
];
