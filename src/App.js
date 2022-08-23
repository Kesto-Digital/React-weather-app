import {useState} from "react";
import React from "react";

import "./index.css";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

const App = () => {

    const [city, setCity] = useState("");

    const [weather, setWeather] = useState([])
    
    const searchWeather = evt => {
        if (evt.key === "Enter"){
            fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options)
                .then(response => response.json())
                .then(data => {
                    setWeather(data)
                    setCity("")
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div className="body">
            <input
            type="text"
            className="search-box"
            placeholder="Search..."
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={searchWeather}
            />
            {(typeof weather.location != "undefined") ? (
                <div className="info-box">
                    <div className="location">
                        <h1> {weather.location.name}, {weather.location.country} </h1>
                    </div>
                    <div className="weather-box">
                        <div className="temp"> 
                            <p>{weather.current.temp_c}°c</p>
                        </div>
                    </div>
                    <div className="condition">
                        <div className="column">
                            <img src={weather.current.condition.icon} className="condition-img" alt={weather.current.condition.text}></img>
                            <div>{weather.current.condition.text}</div>
                        </div>
                        <div className="column1">
                            <p>UV: {weather.current.uv}</p>
                            <p>Wind: {weather.current.wind_kph} kph</p>
                        </div>
                    </div>
                </div>
            ) : ("")}

        </div>
    );
}

export default App;