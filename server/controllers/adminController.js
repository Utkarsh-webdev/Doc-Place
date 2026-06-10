import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// API for adding doctors
const addDoctor = async (req, res) => {
  try {

    console.log("BODY =>", req.body);
    console.log("FILE =>", req.file);

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Check all fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
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

    // Check Existing Doctor
    const doctorExists = await doctorModel.findOne({ email });

    if (doctorExists) {
      return res.json({
        success: false,
        message: "Doctor already exists",
      });
    }

    // Upload Image
    const imageUpload = await cloudinary.uploader.upload(
      imageFile.path,
      {
        resource_type: "image",
      }
    );

    const imageUrl = imageUpload.secure_url;

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Doctor Data
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees), // FIXED
      address: JSON.parse(address),
      image: imageUrl,
      date: Date.now(),
    };

    console.log("Doctor Data =>", doctorData);

    const newDoctor = new doctorModel(doctorData);

    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor Added Successfully",
    });

  } catch (error) {
    console.log("ADD DOCTOR ERROR =>", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        email + password,
        process.env.JWT_SECRET
      );

      res.json({
        success: true,
        token,
      });

    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password')

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
}

export { addDoctor, loginAdmin, allDoctors };