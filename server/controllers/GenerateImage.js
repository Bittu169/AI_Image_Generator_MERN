import axios from "axios";
import { createError } from "../error.js";

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          Accept: "image/png",
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(response.data, "binary").toString(
      "base64"
    );

    res.status(200).json({
      success: true,
      photo: base64Image,
    });
  } catch (error) {
    console.log(
      "HF ERROR:",
      error.response?.data
        ? Buffer.from(error.response.data).toString()
        : error.message
    );

    return next(
      createError(
        error.response?.status || 500,
        error.message || "Image generation failed"
      )
    );
  }
};