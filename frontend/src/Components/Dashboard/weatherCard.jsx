import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const apiKey = "b479382cb334c4bfaadab076361b9169";

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeatherData = async (cityName) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      getWeatherData(city);
    }
  };

  const getWeatherEmoji = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 500) return "🌧️";
    if (weatherId >= 500 && weatherId < 600) return "🌧️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId > 800) return "☁️";
    return "❓";
  };

  return (
    <Card sx={{ marginBottom: 2, padding: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">Weather Info</Typography>
        <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
          <TextField
            label="Enter City"
            variant="outlined"
            size="small"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <Button type="submit" variant="contained" color="primary">
            Get Weather
          </Button>
        </form>

        {error && <Typography color="error">{error}</Typography>}

        {weather && (
          <>
            <Typography variant="h5">{weather.name}</Typography>
            <Typography>Temperature: {weather.main.temp}°C</Typography>
            <Typography>Humidity: {weather.main.humidity}%</Typography>
            <Typography>{weather.weather[0].description}</Typography>
            <Typography variant="h4">
              {getWeatherEmoji(weather.weather[0].id)}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
