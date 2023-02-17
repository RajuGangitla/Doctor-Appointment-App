import {
  authController,
  login,
  register,
  applyDataController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  updatedUser,
} from "../controllers/userController.js";
import express from "express";
import auth from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUserData").post(auth, authController);
router.route("/apply-doctor").post(auth, applyDataController);
router.route("/get-all-notifications").post(auth, getAllNotificationController);
router
  .route("/delete-all-notifications")
  .post(auth, deleteAllNotificationController);
router.route("/getAllDoctors").get(auth, getAllDoctorsController);
router.route("/book-appointment").post(auth, bookAppointmentController);
router.route("/booking-availability").post(auth, bookingAvailabilityController);
router.route("/user-appointments").get(auth, userAppointmentsController);
router.route("/updateProfile").post(auth, updatedUser);




export default router;
