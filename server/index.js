import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import generateImageRoute from "./routes/GenerateImage.js";
import posts from "./routes/Posts.js";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json({ limit: "10mb" })); // safer limit
app.use(express.urlencoded({ extended: true }));

/* ---------------- ROUTES ---------------- */
app.use("/api/generateImage", generateImageRoute);
app.use("/api/post", posts);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running 🚀",
  });
});

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack || err.message);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    status,
    message: err.message || "Something went wrong",
  });
});

/* ---------------- DATABASE CONNECTION ---------------- */
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed");
    console.error(err.message || err);
    process.exit(1);
  }
};

/* ---------------- START SERVER ---------------- */
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () =>
    console.log(`🚀 Server started on port ${PORT}`)
  );
};

startServer();

/* ---------------- GRACEFUL SHUTDOWN (OPTIONAL BUT GOOD) ---------------- */
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
  process.exit(0);
});
// const startServer = async () => {
//   try {
//     connectDB();
//     app.listen(8080, () => console.log("Server started on port 8080"));
//   } catch (error) {
//     console.log(error);
//   }
// };

// startServer();