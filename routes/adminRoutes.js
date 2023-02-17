import express from "express";
import auth from "./../middlewares/authMiddleware.js";
import {
  changeAccountStatus,
  getAllDoctors,
  getAllUsers,
} from "../controllers/adminController.js";

const router = express.Router();

router.route("/doctors").get(auth, getAllDoctors);
router.route("/users").get(auth, getAllUsers);
router.route("/changeAccountStatus").post(auth, changeAccountStatus);

export default router;
