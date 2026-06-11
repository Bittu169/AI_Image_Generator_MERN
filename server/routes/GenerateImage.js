import express from "express";
import { generateImage } from "../controllers/GenerateImage.js";

const router = express.Router();

/* ---------------- ROUTES ---------------- */
router.post("/", generateImage);

export default router;