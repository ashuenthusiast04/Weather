import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../Search/Search';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import Favorites from '../Favorites/Favorites';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      setError(null);
      const apiKey = "16d0e4db3e96c4c3aa07fa40da935b87";
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.list.filter((_, index) => index % 8 === 0));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try another city.');
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
    }
  };

  const fetchFavorites = async () => {
    const response = await axios.get('http://localhost:5000/favorites');
    setFavorites(response.data);
  };

  const addFavorite = async (city) => {
    if (!favorites.some(fav => fav.city.toLowerCase() === city.toLowerCase())) {
      await axios.post('http://localhost:5000/favorites', { city });
      fetchFavorites();
    } else {
      alert('City is already in favorites');
    }
  };

  const removeFavorite = async (id) => {
    await axios.delete(`http://localhost:5000/favorites/${id}`);
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity);
    }
  }, [unit]);

  return (
    <div className='ty'>
      <div className="weather-dashboard">
        <div className="header">

          <div className="search-container">
            <Search fetchWeather={fetchWeather} />
          </div>
          <div className="unit-toggle">
            <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
              {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
            </button>
          </div>
        </div>
        <div className="weather-display-container">
          <WeatherDisplay weather={weather} forecast={forecast} />
          {error && <div className="error">{error}</div>}
        </div>
      </div>
      <div className="weather-favorites">
        <div className='header'>
          <div className="favorites-container">
            <Favorites favorites={favorites} fetchWeather={fetchWeather} addFavorite={addFavorite} removeFavorite={removeFavorite} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
