/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */

import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


const engineId = 'stable-diffusion-512-v2-1';
// enginid
// stable-diffusion-v1
// stable-diffusion-v1-5
// stable-diffusion-512-v2-0
// stable-diffusion-768-v2-0
// stable-diffusion-512-v2-1
// stable-diffusion-768-v2-1
// stable-diffusion-xl-beta-v2-2-2
// stable-diffusion-xl-1024-v0-9
// stable-diffusion-depth-v2-0


const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
const apiKey = process.env.STABILITY_API_KEY;

if (!apiKey) {
  throw new Error('Missing Stability API key.');
}

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Stable diffusion XL-0.9' });
});


//
router.post('/', async (req, res) => {
  try {
    const { prompt, style_preset, photoCount } = req.body;

    const requestBody = {
      text_prompts: [
        {
          text: prompt,
        },
      ],
      cfg_scale: 7,
      clip_guidance_preset: 'SLOWEST',
      // clip model
      // FAST_BLUE, FAST_GREEN, NONE, SIMPLE, SLOW, SLOWER, SLOWEST


      height: 512,
      width: 512,
      samples: photoCount,
      steps: 50,
    };

    // ตรวจสอบว่า style_preset เป็นค่าว่างหรือ "none" หรือไม่
    if (style_preset && style_preset.toLowerCase() !== 'none') {
      requestBody.style_preset = style_preset;
    }

    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();

    const image = responseJSON.artifacts[0].base64;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || 'Something went wrong');
  }
});


export default router;


