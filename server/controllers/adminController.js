import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js";

// API for adding doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
      image,
    } = req.body;

    // Check all fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address ||
      !image
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

    // upload image to cloudinary
    const imageUpload = await connectCloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
    const imageUrl = imageUpload.secure_url

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Doctor
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address:JSON.parse(address),
      image,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);

    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor Added Successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addDoctor };