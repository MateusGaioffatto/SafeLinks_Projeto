import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3000;

app.get('/api/shopping', async (req, res) => {
  const { q } = req.query;
  const apiKey = "62d588a730582c874433f445ab8a2421e43eff119be98934a9e628945c4401cd";
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q)}&gl=br&api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));