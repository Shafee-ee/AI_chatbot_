import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    console.log("User Message:", userMessage);
    console.log("API Key:", process.env.GEMINI_API_KEY);

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

        console.log("Full google gemini API response:", JSON.stringify(response.data, null, 2));

        if (response.data?.parts?.length > 0) {

            const apiContent = response.data.candidates[0]?.content?.parts[0]?.text;


            console.log("Google Gemini API Response:", JSON.stringify(apiContent, null, 2));
            res.json({ reply: apiContent });
        } else {
            console.error("No candidates found in the response.")
            res.status(500).json({ error: "No valid response from API" })
        }

    }
    catch (error) {
        console.error("API Request Failed:", error.response?.data || error.message);
        res.status(500).json({ error: "something went wrong" });
    }
})
export default router;