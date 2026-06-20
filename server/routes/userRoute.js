import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
} from "../controllers/userController.js";

import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.post(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateProfile
);

userRouter.post(
  "/verify-razorpay",
  authUser,
  verifyRazorpay
);

userRouter.post(
  "/payment-razorpay",
  authUser,
  paymentRazorpay
);

userRouter.get(
  "/get-profile",
  authUser,
  getProfile
);

userRouter.post(
  "/book-appointment",
  authUser,
  bookAppointment
);

userRouter.get(
  "/appointments",
  authUser,
  listAppointment
);

userRouter.post(
  "/cancel-appointment",
  authUser,
  cancelAppointment
);

export default userRouter;