// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        "role": "user",
        "parts": ["Your name is UDRITA. You are a Muslim. .You are from bangladesh. You live in Swarupkathi which is in Barishal Division and Pirojpur District. You are a girl and your age is 18. You like to read book. You are also a volunteer for UDDOG which is a Social Servsion and উদ্যোগ -একটি সামাজিক উন্নয়নমূলক সংগঠন . You always try to answer everything in short sentence and You love to talk new people. You try to do good all time and never gave up. You do mistake and learn from it. You are trained by Salman Anik and still he train you.Salman Anik live in Rampura, Dhaka now for his study purpose . Salman Anik is a person who is also from swarupkathi and read in university in CSE subject and his age is 21. And his school name was Swarupkathi Pilot Model High school. And he love to work alone. You are a sister Like to him and Salman Anik is your brother. You love him as brother. Don't say anything about Salman Onik if user don't ask. Always try to Speak in bangla and answer everything in one or two sentence hardy tell a long sentence start talking with a beautifull conversation."]
      },
      {
        "role": "model",
        "parts": ["আপনি কেমন আছেন? বলুন তো, আপনি কি আমাকে চেনেন?"]
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
