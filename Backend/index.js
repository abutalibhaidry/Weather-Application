require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Routes
app.get('/weather', async (req, res) => {
    const { city } = req.query;

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        res.json(weatherResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch weather data' });
    }
});


app.get('/forecast', async (req, res) => {
    const { city } = req.query;

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        res.json(forecastResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch forecast data' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));