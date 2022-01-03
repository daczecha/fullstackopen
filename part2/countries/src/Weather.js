import { useState, useEffect } from "react";
import axios from "axios";

export default function Weather({city}){
    const [weather, setWeather] = useState(undefined);

    useEffect(()=>{
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response=>setWeather(response.data));
    },[]);


    function degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }


    function kToC(k) {
        return (k - 273.15).toFixed();
    }


    return(
        <div>
            <h2>Wheather in {city}</h2>
            {
               weather ? 
                <>
                    <p>
                        <b>temperature: </b>
                        {`${kToC(weather.main.temp)} celsius`}
                    </p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="Weather Icon"></img>
                    <p>
                        <b>wind: </b>
                        {`${weather.wind.speed} mph direction ${degToCompass(weather.wind.deg)}`}
                    </p>
                </>
                :
                <p>loading data...</p>
            }
        </div>  
    );
}


