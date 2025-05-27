import { useState } from "react";

const Recommendations = () => {
  const [data, setData] = useState("");
  const [topics, setTopics] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    try {
      // Clear previous errors and data
      setError("");

      // Validate inputs
      if (!topics.trim()) {
        setError("Please enter at least one topic");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/recommendations/generate-recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topics, difficulty }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Display the server's error message if available
        const errorMessage =
          result.error || `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      setData(result.recommendations);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load recommendations."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Study Recommendations
        </h1>

        {/* Topic Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Topics</label>
          <input
            type="text"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Enter topics (e.g., React, JavaScript)"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Difficulty Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Fetch Button */}
        <button
          onClick={fetchRecommendations}
          disabled={!topics.trim()}
          className={`text-white py-2 px-4 rounded w-full transition ${
            topics.trim()
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Get Recommendations
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            <p className="text-center">{error}</p>
          </div>
        )}

        {/* Recommendations Output */}
        {data && (
          <div className="mt-6 border p-4 rounded bg-gray-100">
            <h2 className="font-bold text-lg mb-2">AI Recommendations:</h2>
            <p className="text-gray-700">{data}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
