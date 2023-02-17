import Doctors from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import User from "../models/userModel.js";



const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctors.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching doctor details",
    });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctors.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating doctor details",
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctors.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single data Info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting doctor details",
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await Doctors.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "doctor appointments data fetch success",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting doctor-appointment details",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await User.findOne({ _id: appointments.userId });
    const notification = user.notification;
    const index = notification.length
      ? notification[notification.length - 1].id + 1
      : 1;
    notification.push({
      type: "status-updated",
      id: index,
      message: `your appointment has been updated ${status}`,
      data:{
        onClickPath: "/appointments"
      }
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

export {
  getDoctor,
  updateDoctor,
  getDoctorById,
  doctorAppointmentsController,
  updateStatusController,
};
