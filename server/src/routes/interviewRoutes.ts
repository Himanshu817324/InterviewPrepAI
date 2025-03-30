import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = express.Router();

// POST endpoint to generate interview questions
router.post('/generate-questions', async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key is not configured');
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Generate interview questions and provide detailed answers for the following topic: ${topic}. Provide explanations where applicable.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // Extract and return the generated content
    const generatedContent = response.data.choices[0].message.content;
    return res.json({ questions: generatedContent });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    return res.status(500).json({ error: 'Failed to generate interview questions' });
  }
});

export default router;