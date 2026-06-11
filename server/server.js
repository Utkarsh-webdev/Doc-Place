import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from './routes/doctorRoute.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});