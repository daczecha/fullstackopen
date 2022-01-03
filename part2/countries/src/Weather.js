import { useState, useEffect } from "react";
import axios from "axios";

export default function Weather({city}){
    const [weather, setWeather] = useState();

    useEffect(()=>{
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'64dad1960f93ae1e6a0053e74b270eb3'}`)
            .then(response=>setWeather(response.data));
    },[]);


    function degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }


    return(
        <div>
            <h2>Wheather in {city}</h2>
            <p>{JSON.stringify(weather.wind.speed)}</p>
        </div>  
    );
}


