import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctors from "../models/doctorModel.js";
import appointments from "../models/appointmentModel.js";
import moment from "moment";

const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already existed", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const user = await new User(req.body);
    await user.save();
    res.status(201).send({ message: "Register Successfully ", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Register controller ${error.message}`,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    }
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .send({ message: "Login Successfully ", success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Login controller ${error.message}`, success: false });
  }
};

const authController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "auth error", success: false, error });
  }
};

const applyDataController = async (req, res) => {
  try {
    const newDoctor = await Doctors({
      ...req.body,
      status: "pending",
    });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    const index = notification.length
      ? notification[notification.length - 1].id + 1
      : 1;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor Account`,
      id: index,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while submitting the Doctor form",
    });
  }
};

const updatedUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "user profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating user details",
    });
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notifications mark as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in notification", success: false, error });
  }
};

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    res.status(200).send({
      message: "Notifications deleted successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "unable to delete notifications",
      success: false,
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctors.find({ status: "approved" });
    res.status(200).send({
      message: "Doctors list fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "unable to get all doctors", success: false, error });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    console.log(req.body.time);
    console.log(req.body.date);
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointments(req.body);
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/auth/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointment = await appointments.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointment.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointment = await appointments.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

export {
  register,
  login,
  authController,
  applyDataController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  updatedUser,
};
