import express from "express";
import { createPost, getAllPosts } from "../controllers/Posts.js";

const router = express.Router();

/* ---------------- ROUTES ---------------- */
router.get("/", getAllPosts);
router.post("/", createPost);

export default router;