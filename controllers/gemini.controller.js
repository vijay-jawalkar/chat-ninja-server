require("dotenv").config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // 2. Initialise Model
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro", generationConfig });

async function generateContent(req, res) {
    try {
      const {prompt} = req.body;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      res.status(201).json({message: response.text()})
      console.log(response.text());
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({error: "Something went wrong ! Please ask another question."})
    }
  }
  



  module.exports = generateContent;