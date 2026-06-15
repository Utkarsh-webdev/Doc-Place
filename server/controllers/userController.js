import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// Generate JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check Missing Fields
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // Validate Email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate Password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Check Existing User
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate Token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "User Registered Successfully",
    });

  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
      message: "Login Successful",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel
      .findById(userId)
      .select("-password");

    res.json({
      success: true,
      userData,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      name,
      phone,
      address,
      dob,
      gender,
    } = req.body;

    const imageFile = req.file;

    // Validation
    if (!name || !phone || !dob || !gender || !address) {
      return res.json({
        success: false,
        message: "Data Missing",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // Upload image if provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        {
          resource_type: "image",
        }
      );

      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, {
        image: imageURL,
      });
    }

    res.json({
      success: true,
      message: "Profile Updated",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      docId,
      slotDate,
      slotTime,
    } = req.body;

    // Get doctor data
    const docData = await doctorModel
      .findById(docId)
      .select("-password");

    if (!docData) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor not available",
      });
    }

    let slots_booked = docData.slots_booked;

    // Check slot availability
    if (slots_booked[slotDate]) {
      if (
        slots_booked[slotDate].includes(slotTime)
      ) {
        return res.json({
          success: false,
          message: "Slot not available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // Get user data
    const userData = await userModel
      .findById(userId)
      .select("-password");

    // Appointment Data
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment =
      new appointmentModel(appointmentData);

    await newAppointment.save();

    // Save booked slots
    await doctorModel.findByIdAndUpdate(
      docId,
      {
        slots_booked,
      }
    );

    res.json({
      success: true,
      message: "Appointment Booked",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, };