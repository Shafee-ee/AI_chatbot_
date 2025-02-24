import express from 'express';
import chatRoutes from "./routes/chatRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", chatRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello, AI chatbot")
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`)
});