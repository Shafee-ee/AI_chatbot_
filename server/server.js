import express from 'express';
import chatRoutes from "./routes/chatRoutes.js";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

// Test Route (remove after debugging)
app.post("/test", (req, res) => {
    console.log("Test Route Hit! Request Body:", req.body);
    res.json({ received: req.body });
});

// Chat API Route
app.use("/api", (req, res, next) => {
    console.log('API route hit');
    next();
})

app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello, AI chatbot");
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});
