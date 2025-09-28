import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import allRoute from "./src/router/index.js";

dotenv.config(); // Load .env file

const app = express();

// ===== Middlewares =====
app.use(cors()); // enable CORS for all routes
app.use(morgan("dev")); // log requests
app.use(bodyParser.json()); // parse JSON bodies

// ===== Routes =====
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

app.use("/api", allRoute);

// ===== Start Server =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB(); // connect to MongoDB before server starts
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
