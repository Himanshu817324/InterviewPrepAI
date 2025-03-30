import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Generate Study Recommendations
router.post("/generate-recommendations", async (req, res) => {
  const { topics, difficulty } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Give me study recommendations, resources, and practice questions for the following topics: ${topics}. Difficulty level: ${difficulty}. Provide links if possible.`,
          },
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    res.json({ recommendations: response.data.choices[0].message.content });
    console.log(response);
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Error fetching recommendations" });
  }
});

export default router;
