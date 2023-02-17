import express from "express";
import {
  getDoctor,
  updateDoctor,
  getDoctorById,
  doctorAppointmentsController,
  updateStatusController,
} from "../controllers/doctorController.js";
import auth from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/doctorInfo").post(auth, getDoctor);
router.route("/updateProfile").post(auth, updateDoctor);
router.route("/getDoctorById").post(auth, getDoctorById);
router.route("/doctor-appointments").get(auth, doctorAppointmentsController);
router.route("/update-status").post(auth, updateStatusController);

export default router;
