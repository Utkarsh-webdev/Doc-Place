import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Change Doctor Availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({
      success: true,
      message: "Availability Changed",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select("-password -email");

    res.json({
      success: true,
      doctors,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      doctor.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
      doctor,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get Doctor Appointments
const appointmentsDoctor = async (req, res) => {
  try {

    const { docId } = req;

    const appointments = await appointmentModel.find({
      docId,
    });

    res.json({
      success: true,
      appointments,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Complete Appointment
const appointmentComplete = async (req, res) => {
  try {

    const { docId } = req;
    const { appointmentId } = req.body;

    const appointmentData =
      await appointmentModel.findById(appointmentId);

    if (
      appointmentData &&
      appointmentData.docId === docId
    ) {
      await appointmentModel.findByIdAndUpdate(
        appointmentId,
        { isCompleted: true }
      );

      return res.json({
        success: true,
        message: "Appointment Completed",
      });
    }

    res.json({
      success: false,
      message: "Mark Failed",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Appointment
const appointmentCancel = async (req, res) => {
  try {

    const { docId } = req;
    const { appointmentId } = req.body;

    const appointmentData =
      await appointmentModel.findById(appointmentId);

    if (
      appointmentData &&
      appointmentData.docId === docId
    ) {
      await appointmentModel.findByIdAndUpdate(
        appointmentId,
        { cancelled: true }
      );

      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    }

    res.json({
      success: false,
      message: "Cancellation Failed",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
};