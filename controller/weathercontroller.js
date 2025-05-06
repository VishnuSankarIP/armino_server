const axios = require('axios');
const Weather=require('../models/weathermodel');
const API_KEY = process.env.API_KEY;

const allowedCities = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'];


exports.fetchAndSaveWeather = async (req, res) => {
  const { city } = req.params;

  if (!allowedCities.includes(city)) {
    return res.status(400).json({ message: 'Invalid city' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;
    const weather = new Weather({
      city,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      date: new Date()
    });

    await weather.save();
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
};


exports.getWeatherHistory = async (req, res) => {
    const { city, from, to } = req.query;
    
    if (!allowedCities.includes(city)) {
      return res.status(400).json({ message: 'Invalid city' });
    }
  
    const startDate = new Date(from);
    const endDate = new Date(to);
    const diff = (endDate - startDate) / (1000 * 60 * 60 * 24);
  
    if (diff > 30) {
      return res.status(400).json({ message: 'Maximum date range is 30 days' });
    }
  
    try {
      const history = await Weather.find({
        city,
        date: { $gte: startDate, $lte: endDate },
      }).sort({ date: -1 });
  
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching history' });
    }
  };


