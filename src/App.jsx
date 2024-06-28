import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard";
import Navbar from "./components/Navbar/Navbar";
import './App.css';


const App = () => {
  return (
    <div className="app">
      <Navbar />
      <WeatherDashboard />
    </div>
  )
}

export default App;