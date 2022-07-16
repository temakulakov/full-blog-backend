import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHashed: {
      type: String,
      required: true,
    },
    avatarURL: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
