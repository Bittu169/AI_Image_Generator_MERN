import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

/* ---------------- CLOUDINARY CONFIG ---------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ---------------- GET ALL POSTS ---------------- */
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("GET POSTS ERROR:", error);

    return next(
      createError(500, error.message || "Failed to fetch posts")
    );
  }
};

/* ---------------- CREATE POST ---------------- */
export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;

    /* ---- VALIDATION ---- */
    if (!name || !prompt || !photo) {
      return next(
        createError(400, "Name, prompt and photo are required")
      );
    }

    /* ---------------- FIX: ENSURE VALID IMAGE FORMAT ---------------- */
    let photoData = photo;

    // If frontend sends raw base64, fix it
    if (!photo.startsWith("data:image")) {
      photoData = `data:image/png;base64,${photo}`;
    }

    /* ---------------- CLOUDINARY UPLOAD ---------------- */
    const uploadedResponse = await cloudinary.uploader.upload(
      photoData,
      {
        folder: "ai-generated-images",
        resource_type: "image",
      }
    );

    /* ---------------- SAVE POST ---------------- */
    const newPost = await Post.create({
      name,
      prompt,
      photo: uploadedResponse.secure_url,
    });

    return res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    return next(
      createError(
        500,
        error.message || "Failed to create post"
      )
    );
  }
};