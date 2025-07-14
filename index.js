import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.get('/image', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send("Missing image URL");

  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("content-type");

    res.setHeader('Content-Type', contentType);
    response.body.pipe(res);
  } catch (e) {
    res.status(500).send("Failed to fetch image");
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
