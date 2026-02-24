import dotenv from "dotenv";
import app from "./app.js";
import {connectDB} from './Config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
import cors from "cors";

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://hrms-seven-dusky.vercel.app"
  ],
  credentials: true
}));

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();