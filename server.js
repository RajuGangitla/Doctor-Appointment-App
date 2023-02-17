import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDb from "./config/db.js";
dotenv.config();
import authRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const app = express();


const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')));

//db connection
mongoose.set("strictQuery", true);
connectDb();

//middleware
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `server is running ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
  );
});
