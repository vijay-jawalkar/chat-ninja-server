const express = require("express")
const router = express.Router();
const generateContent = require("../controllers/gemini.controller.js")

router.post("/chatbot", generateContent)

module.exports = router;