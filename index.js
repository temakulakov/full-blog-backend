import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

const PORT = 4000;
mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.gduzx.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB was been connected...");
  })
  .catch((err) => {
    console.log("DB was not connected: ", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cd) => {
    cd(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.status(200).send({
    message: `/uploads/${req.file.originalName}`,
  });
});

app.post(
  "/posts",
  checkAuth,
  registerValidation,
  postCreateValidation,
  PostController.create
);
app.get("/posts", checkAuth, PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.removeOne);
app.patch(
  "/posts/:id",
  checkAuth,
  registerValidation,
  postCreateValidation,
  PostController.updateOne
);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("Server was been started on PORT: ", PORT);
  }
});
