import express from "express";
const router = express.Router();

router.post("/chat", async (res, req) => {
    const userMessage = req.body.message;

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


    }
    catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
})
export default router;