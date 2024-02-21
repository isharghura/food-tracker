const express = require('express');
let app = express();
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env');

dotenv.config({ path: envPath });

app.use('/static', express.static(path.resolve(__dirname, '../static')));

app.get('/', async (req, res) => {
    const indexPath = path.resolve(__dirname, '../templates/index.html');
    res.sendFile(indexPath);
})

app.get('/api/getData/:inputData', async (req, res) => {
    const inputData = req.params.inputData;
    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(process.env.apikey)}&query=${encodeURIComponent(inputData)}&dataType=${encodeURIComponent("Foundation")}&pageSize=${encodeURIComponent(1)}`;
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
