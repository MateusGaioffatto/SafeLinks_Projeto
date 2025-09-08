// DeepSeek MÉTODO:
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3000;

app.get("/api/search", async (req, res) => {
    const searchQuery = req.query.q;
    
    if (!searchQuery) {
        return res.status(400).json({ error: "Missing search query" });
    }

    const apiKey = "62d588a730582c874433f445ab8a2421e43eff119be98934a9e628945c4401cd"; // Replace with your actual key
    const URL = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&gl=br&api_key=${apiKey}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});