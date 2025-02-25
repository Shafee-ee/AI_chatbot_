import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    console.log("User Message:", userMessage);

    if (!userMessage) {
        console.error("No message received in the request body!");
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: userMessage }],
                    }
                ],
            }
        );

        const apiContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (apiContent) {
            console.log("Google Gemini API Response:", apiContent);
            res.json({ reply: apiContent });
        } else {
            console.error("No valid response from API");
            res.status(500).json({ error: "No valid response from API" });
        }

    } catch (error) {
        console.error("API Request Failed:", error.message || error.response?.data);
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;
