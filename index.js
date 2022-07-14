import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";

const PORT = 4000;

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.gduzx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB was been connected...");
  })
  .catch((err) => {
    console.log("DB was not connected: ", err);
  });

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  } else {
    return res.status(200).json(req.body);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("Server was been started on PORT: ", PORT);
  }
});
