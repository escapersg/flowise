const express = require('express');
const axios = require('axios');
const app = express();

app.get('/convert', async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) return res.status(400).json({ error: 'Missing image URL' });

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64 = Buffer.from(response.data).toString('base64');
        const contentType = response.headers['content-type'] || 'image/jpeg';
        const dataUrl = `data:${contentType};base64,${base64}`;
        res.json({ base64: dataUrl });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch or convert image', message: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Image-to-Base64 converter is live.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
