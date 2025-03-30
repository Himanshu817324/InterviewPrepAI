# Interview Preparation Application

A comprehensive application designed to help users prepare for technical interviews with AI-powered recommendations and practice questions.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [API Endpoints](#api-endpoints)
- [Testing AI Features](#testing-ai-features)
- [Project Structure](#project-structure)

## Features

- Study plan generation based on selected topics and difficulty levels
- AI-powered interview question generation
- Practice interview simulations
- Progress tracking
- Resource recommendations

## Technologies

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: OpenAI GPT models

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/interview-prep-app.git
   cd interview-prep-app
   ```

2. Install dependencies for both client and server:

   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Start the development servers:

   ```
   # Start the backend server (from the server directory)
   npm run dev

   # Start the frontend server (from the client directory)
   npm start
   ```

## Environment Configuration

The application requires an OpenAI API key to function properly. Follow these steps to configure it:

1. Create a `.env` file in the `server` directory
2. Add your OpenAI API key to the file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

> **Important**: You need to obtain an API key from [OpenAI's platform](https://platform.openai.com/). Without this key, the AI-powered features (recommendations and interview question generation) will not work.

## API Endpoints

### Study Recommendations

- **Endpoint**: `/api/recommendations/generate-recommendations`
- **Method**: POST
- **Body**:
  ```json
  {
    "topics": "JavaScript, React, Data Structures",
    "difficulty": "Intermediate"
  }
  ```
- **Response**: JSON object containing AI-generated study recommendations

### Interview Questions

- **Endpoint**: `/api/interviews/generate-questions`
- **Method**: POST
- **Body**:
  ```json
  {
    "topic": "React Hooks"
  }
  ```
- **Response**: JSON object containing AI-generated interview questions and answers

## Testing AI Features

### Using Postman

1. **Test Study Recommendations**:

   - Create a new POST request to `http://localhost:5000/api/recommendations/generate-recommendations`
   - Set the Content-Type header to `application/json`
   - Add a request body with topics and difficulty:
     ```json
     {
       "topics": "JavaScript, React, Data Structures",
       "difficulty": "Intermediate"
     }
     ```
   - Send the request and verify you receive AI-generated recommendations

2. **Test Interview Question Generation**:
   - Create a new POST request to `http://localhost:5000/api/interviews/generate-questions`
   - Set the Content-Type header to `application/json`
   - Add a request body with the topic:
     ```json
     {
       "topic": "React Hooks"
     }
     ```
   - Send the request and verify you receive AI-generated interview questions

### Using the UI

1. **Study Recommendations**:

   - Navigate to the Study Plan page
   - Select topics and difficulty level
   - Click the "Generate Recommendations" button
   - Verify that AI-generated recommendations appear

2. **Interview Questions**:
   - Navigate to the Interview page
   - Select a topic from the dropdown
   - Click the "Generate AI Questions" button
   - Verify that AI-generated interview questions appear

## Project Structure

```
interview-prep-app/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── ...
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── routes/         # API route definitions
│   │   ├── models/         # Data models
│   │   ├── controllers/    # Route controllers
│   │   └── ...
│   └── .env                # Environment variables (create this file)
└── README.md               # This file
```

## Troubleshooting

- **AI Features Not Working**: Ensure your OpenAI API key is correctly set in the `.env` file and that you have sufficient credits on your OpenAI account.
- **API Connection Issues**: Verify that both the frontend and backend servers are running and that the proxy is correctly set up in the client's package.json.
