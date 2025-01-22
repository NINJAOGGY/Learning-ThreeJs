import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

// GET route to verify the endpoint
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Ninjaoggy' });
});

// POST route to generate an image using ClipDrop AI
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLIPDROP_API_KEY,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`ClipDrop API error: ${response.statusText}`);
    }

    const buffer = await response.buffer(); // Get the image as a binary buffer
    const base64Image = `data:image/png;base64,${buffer.toString('base64')}`; // Convert to base64

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error('Error generating image:', error.message || error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
