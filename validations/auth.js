import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must been min 5 symbols").isLength({ min: 5 }),
  body("fullName", "Enter name").isLength({ min: 2 }),
  body("avatarURL", "Don't right link").optional().isURL()
];
