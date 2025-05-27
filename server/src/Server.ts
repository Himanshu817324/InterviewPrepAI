import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import multer from "multer";
import authRoutes from "./routes/AuthRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import interviewRoutes from "./routes/interviewRoutes";
import path from "path";
import userRoutes from "./routes/AuthRoutes";
import { OpenAI } from "openai";

dotenv.config();
connectDB();

const app = express();

// Configure CORS for production
const allowedOrigins = ['http://localhost:5173', 'https://your-netlify-app.netlify.app'];
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? allowedOrigins.filter(origin => origin.includes('netlify'))
    : allowedOrigins,
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

// Before using OpenAI, verify the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// At the beginning of the app, check if the API key exists
if (!process.env.OPENAI_API_KEY) {
  console.error("WARNING: OpenAI API key is not set in environment variables");
}

// Generate AI Interview Questions
app.post("/api/interview/generate-questions", async (req, res) => {
  console.log("Received request to generate AI questions:", {
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  // Check for required topic field
  if (!req.body.topic) {
    console.warn(
      "Missing required 'topic' field in generate-questions request"
    );
    return res
      .status(400)
      .json({ error: "Topic is required to generate relevant questions" });
  }

  // Check if API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.error("OpenAI API key is not configured");
    return res.status(500).json({ error: "OpenAI API key is not configured" });
  }

  try {
    console.log(`Generating AI questions for topic: ${req.body.topic}`);
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'Generate three interview questions in JSON format as an array of objects. Each object should have two keys: \'category\' and \'question\'. For example: [{ "category": "Technical", "question": "Explain ..." }, ...].',
        },
        {
          role: "user",
          content:
            "Provide three technical and behavioral interview questions in JSON format as specified.",
        },
      ],
    });

    const rawContent = aiResponse.choices?.[0]?.message?.content;
    if (!rawContent) {
      console.error("No content returned from OpenAI");
      return res.status(500).json({ error: "No content returned from OpenAI" });
    }

    try {
      // Attempt to parse the response as JSON
      const questions = JSON.parse(rawContent);
      res.json(questions);
    } catch (parseError) {
      console.error("Error parsing AI response as JSON:", parseError);
      console.error("Raw AI response:", rawContent);

      // Return a default set of questions when parsing fails
      const defaultQuestions = [
        {
          category: "Technical",
          question:
            "Explain the difference between let, const, and var in JavaScript.",
        },
        {
          category: "Behavioral",
          question: "Describe a time when you had to meet a tight deadline.",
        },
        {
          category: "Problem Solving",
          question:
            "How would you approach debugging a complex issue in production?",
        },
      ];

      console.log("Returning default questions due to parsing error");
      res.json(defaultQuestions);
    }
  } catch (error) {
    console.error("Error fetching AI questions:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    res.status(500).json({
      error: "Failed to generate AI questions",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Generate AI Feedback
app.post("/api/interview/generate-response", async (req, res) => {
  const { question, answer } = req.body;

  console.log("Received request to generate AI feedback:", {
    questionLength: question?.length,
    answerLength: answer?.length,
    timestamp: new Date().toISOString(),
  });

  if (!question || !answer) {
    console.warn("Missing required fields in generate-response request:", {
      hasQuestion: !!question,
      hasAnswer: !!answer,
    });
    return res.status(400).json({ error: "Question and answer are required" });
  }

  try {
    console.log("Generating AI feedback for interview response");
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an AI interviewer providing constructive feedback on answers.",
        },
        {
          role: "user",
          content: `Interview question: ${question}\nCandidate's response: ${answer}\nProvide feedback.`,
        },
      ],
    });

    const feedback = aiResponse.choices[0].message.content;
    console.log(
      "Successfully generated AI feedback, length:",
      feedback?.length
    );
    res.json({ feedback });
  } catch (error) {
    console.error("Error fetching AI feedback:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    res.status(500).json({
      error: "Failed to generate response",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (
    req: any,
    file: { originalname: any },
    cb: (arg0: null, arg1: any) => void
  ) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// API route to handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Change this:
app.use("/api/recommendations", recommendationRoutes);

// Add a logging middleware before the route if needed
app.use((req, res, next) => {
  if (req.path.includes("/recommendations")) {
    console.log(`Recommendation API request: ${req.method} ${req.path}`, {
      query: req.query,
      body: req.method !== "GET" ? req.body : undefined,
      timestamp: new Date().toISOString(),
    });
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
