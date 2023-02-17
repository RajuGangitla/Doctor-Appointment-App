import User from "../models/userModel.js";
import Doctors from "../models/doctorModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .send({ success: true, message: "Users data list", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting users data ",
      error,
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctors.find({});
    res
      .status(200)
      .send({ success: true, message: "doctors data list", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data ",
      error,
    });
  }
};

const changeAccountStatus = async (req,res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctors.findByIdAndUpdate(doctorId, { status });
    console.log(doctor.userId)
    const user = await User.findOne({ _id: doctor.userId });
    console.log(user)
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your doctor account request has ${status}`,
      onClickPath: "/notifications",
    });
    user.isDoctor =status === "approved" ? true : false;
    await user.save();
    res
      .status(201)
      .send({ success: true, message: "Account status updated", data: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating account status ",
      error,
    });
  }
};

export { getAllDoctors, getAllUsers, changeAccountStatus };
