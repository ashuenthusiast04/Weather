import './WeatherDisplay.css';

const WeatherDisplay = ({ weather, forecast, unitSymbol }) => {
  if (!weather) return <div>Please enter any city</div>;

  return (
    <div className="weather-display">
      <div className="weather-card">
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}°{unitSymbol}</p>
        <p>Weather: {weather.weather[0].description}</p>
      </div>
      <h3>5-day Forecast</h3>
      <div className="forecast">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <p>Date: {new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {day.main.temp}°{unitSymbol}</p>
            <p>Weather: {day.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
