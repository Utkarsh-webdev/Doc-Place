import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    dob: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: Object,
      default: {
        line1: "",
        line2: "",
      },
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const userModel =
  mongoose.models.user ||
  mongoose.model("user", userSchema);

export default userModel;