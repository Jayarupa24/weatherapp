import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = "ebbe1bc832cde5f1582b380fc0fc656e";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const result = await res.json();

      if (result.cod === 200) {
        setData(result);
        setError("");
      } else {
        setError("City not found. Please try again.");
        setData(null);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="weather-container">
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {data && data.main && (
        <div className="weather-info">
          <h2>
            {data.name}, {data.sys.country}
          </h2>
          <p>🌡 Temperature: {data.main.temp}°C</p>
          <p>☁ Condition: {data.weather[0].description}</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
          <p>🌬 Wind Speed: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
