import { useState, useEffect } from "react";
import {
  FaPlay,
  FaStop,
  FaClock,
  FaCheckCircle,
  FaQuestionCircle,
  FaRobot,
} from "react-icons/fa";

const questions = [
  {
    category: "Technical",
    question: "Explain the difference between React and Angular.",
  },
  {
    category: "Behavioral",
    question: "Describe a time you faced a challenge and how you handled it.",
  },
  {
    category: "System Design",
    question: "How would you design a URL shortening service like Bit.ly?",
  },
];

const Interview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [aiQuestions, setAiQuestions] = useState<
    { category: string; question: string }[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && isRecording) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setFeedback(null);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await generateFeedback();
  };

  const generateFeedback = async () => {
    try {
      if (!answer.trim()) {
        setError("Please provide an answer before generating feedback");
        setFeedback("Please provide an answer to receive AI feedback.");
        return;
      }

      const questionSet = aiQuestions || questions;
      const currentQuestionText = questionSet[currentQuestion].question;

      const response = await fetch(
        "http://localhost:5000/api/interview/generate-response",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: currentQuestionText,
            answer: answer,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate AI feedback");

      const data = await response.json();
      setFeedback(data.feedback);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate feedback"
      );
      setFeedback("Unable to generate AI feedback at this time.");
    }

    const questionSet = aiQuestions || questions;
    setProgress(((currentQuestion + 1) / questionSet.length) * 100);
  };

  const fetchAIQuestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/interview/generate-questions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: "General" }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch AI questions");

      const data = await response.json();
      setAiQuestions(data);
      setCurrentQuestion(0);
      setAnswer("");
      setFeedback(null);
      setTimeLeft(120);
      setProgress(0);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    const questionSet = aiQuestions || questions;
    if (currentQuestion < questionSet.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(120);
      setAnswer("");
      setFeedback(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-5">Mock Interview</h1>

      <div className="mb-6 w-full max-w-2xl">
        <button
          onClick={fetchAIQuestions}
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center transition ${
            isLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          <FaRobot className="mr-2" />
          {isLoading
            ? "Generating Questions..."
            : "Generate AI Interview Questions"}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {aiQuestions && (
          <p className="mt-2 text-green-600">
            AI questions loaded successfully!
          </p>
        )}
      </div>

      <div className="bg-white shadow-md p-6 rounded-lg max-w-2xl w-full text-center">
        <h2 className="text-lg font-semibold text-gray-600 flex items-center justify-center">
          <FaQuestionCircle className="mr-2 text-blue-500" />
          {(aiQuestions || questions)[currentQuestion].category} Question
          {aiQuestions && (
            <FaRobot className="ml-2 text-purple-500" size={16} />
          )}
        </h2>
        <p className="text-xl font-medium text-gray-800 mt-3">
          {(aiQuestions || questions)[currentQuestion].question}
        </p>

        <div className="flex justify-center items-center mt-4">
          <FaClock
            className={`text-gray-500 mr-2 ${
              timeLeft < 10 ? "text-red-500" : ""
            }`}
          />
          <span className="text-lg font-semibold">{timeLeft} sec left</span>
        </div>

        <textarea
          className="w-full p-3 mt-4 border border-gray-300 rounded-lg"
          rows={4}
          placeholder="Type your response here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="flex justify-center mt-4 space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition hover:bg-green-700"
            >
              <FaPlay className="mr-2" /> Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition hover:bg-red-700"
            >
              <FaStop className="mr-2" /> Stop Recording
            </button>
          )}
        </div>

        {feedback && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-300 text-gray-700">
            <h3 className="text-lg font-semibold flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" /> AI Feedback:
            </h3>
            <p className="mt-2">{feedback}</p>
          </div>
        )}
      </div>

      <button
        onClick={nextQuestion}
        disabled={!feedback}
        className={`mt-6 px-6 py-2 rounded-lg font-semibold transition ${
          feedback
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Next Question
      </button>

      <div className="w-full max-w-2xl mt-6 bg-gray-300 h-2 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-gray-600 font-medium">
        {Math.min(progress, 100)}% Completed
        {aiQuestions && (
          <span className="ml-2 text-purple-600">(AI Questions)</span>
        )}
      </p>

      <p className="mt-4 text-sm text-gray-500">
        {aiQuestions
          ? "Using AI-generated questions"
          : "Using default questions"}
      </p>
    </div>
  );
};

export default Interview;
