import express from 'express';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const rapidapiKey = process.env.RAPIDAPI_KEY;

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from TranTexts!' });
});

router.post('/translate', async (req, res) => {
  try {
    const { text, target, source } = req.body;

    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const apiKeyHeader = 'X-RapidAPI-Key';
    const hostHeader = 'X-RapidAPI-Host';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        [apiKeyHeader]: rapidapiKey,
        [hostHeader]: 'google-translate1.p.rapidapi.com',
      },
      body: new URLSearchParams({
        q: text,
        target,
        source,
      }),
    });

    const data = await response.json();
    const translation = data.data.translations[0].translatedText;
    res.status(200).json({ translation });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

export default router;
