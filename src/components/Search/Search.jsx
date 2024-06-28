import React from 'react';
import { useState } from 'react';
import './Search.css';

const Search = ({ fetchWeather }) => {
  const [city, setCity] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    fetchWeather(city);
    localStorage.setItem('lastSearchedCity', city);
    setCity('');
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className={`search-input ${isFocused ? 'focused' : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default Search;
