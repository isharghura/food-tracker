const express = require('express');
let app = express();
const fetch = require('node-fetch');
require('dotenv').config();
const path = require('path');

app.use('/static', express.static(path.resolve(__dirname + '/static')));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
})

app.get('/test', async (req, res) => {
    res.json(process.env.test);
})

app.get('/getData/:inputData', async (req, res) => {
    console.log(process.env.message);
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
