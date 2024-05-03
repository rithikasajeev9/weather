import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState("");
  const [weather, setWeather] = useState(null);
  const ar = [
    { weather: "few clouds", image: "/few.jpg" },
    { weather: "scattered clouds", image: "/scattered.jpg" },
    { weather: "broken clouds", image: "/broken.jpg" },
    { weather: "overcast clouds", image: "/overcast.jpg" },
    { weather: "clear sky", image: "/clear.webp" },
    { weather: "light rain", image: "/lightrain.jpg" },
    { weather: "haze", image: "/haze.jpg" }
  ];

  async function getWeather() {
    if (data.length !== 0) {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=f8dd776473aa0089e860acd45c1d9ad5`);
        console.log(res.data);
        setWeather(res.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    } else {
      alert("Enter a location!");
    }
  }

  async function defaultCity() {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=f8dd776473aa0089e860acd45c1d9ad5`);
      setWeather(res.data);
    } catch (error) {
      console.error('Error fetching default city weather data:', error);
    }
  }

  useEffect(() => {
    defaultCity();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundImage: weather ? `url(${ar.find(item => item.weather === weather.weather[0].description)?.image})` : 'url(/public/default-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center',filter:' brightness(80%)'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <h1 className="text-center mb-4" style={{ color: "#fff", fontFamily: "'Cursive', cursive", fontSize: "4rem", fontWeight: "bold" }}>Weather App</h1>
            <div className="input-group mb-3">
              <input type="search" className="form-control rounded-pill border border-secondary border-5" placeholder="Enter a city..." aria-label="City" aria-describedby="search-addon" style={{ fontSize: "1.2rem", borderRadius: "20px 0 0 20px", border: "none", boxShadow: "none", paddingLeft: "20px" }} onChange={(e) => setData(e.target.value)} />
              <button className="btn btn-secondary rounded-pill px-4" type="button" id="search-addon" style={{ borderRadius: "0 20px 20px 0", border: "none", boxShadow: "none", fontSize: "1.2rem", fontWeight: "bold" }} onClick={getWeather}>Check Weather</button>
            </div>
            {weather && (
              <>
                <h4 className="mb-0" style={{ color: "white", fontFamily: "'Cursive', cursive", fontWeight: "bold", fontSize: "2rem" }}>{weather.name}, {weather.sys.country}</h4>
                <p className="display-2 my-3" style={{ color: "white", fontSize: "3rem", fontWeight: "bold" }}>{(weather.main.temp - 273.15).toFixed(2)} °C</p>
                <p className="mb-2" style={{ color: "white", fontSize: "1.5rem" }}>Feels Like: <strong>{(weather.main.feels_like - 273.15).toFixed(2)} °C</strong></p>
                <h5 style={{ color: "white", fontSize: "1.5rem" }}>{weather.weather[0].description}</h5>
                <h5 style={{ color: "white", fontSize: "1.5rem" }}>Humidity: {weather.main.humidity}</h5>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
