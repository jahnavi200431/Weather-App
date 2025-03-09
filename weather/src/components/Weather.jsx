import React, { useEffect,useState,useRef } from 'react'
import './Weather.css'
import search_icon  from '../assets/search.png'
import clear_icon  from '../assets/clear.png'
import cloud_icon  from '../assets/cloud.png'
import drizzle_icon  from '../assets/drizzle.png'
import humidity_icon  from '../assets/humidity.png'
import rain_icon  from '../assets/rain.png'
import snow_icon  from '../assets/snow.png'
import wind_icon  from '../assets/wind.png'
const Weather = () => {
    const inputRef=useRef()
    const [weatherdata,setwaetherdata]=useState(false);
    const allicons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "10d":rain_icon,
        "10d":rain_icon,
        "09d":rain_icon,
        "09d":rain_icon,
        "13d":snow_icon,
        "13d":snow_icon,
    }
    const search=async (city)=>{
        if(city===""){
            alert("Enter city name");
            return ;
        }
        try{
const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=342fe0ff338cb4b39a1621495b3eb4d5`;

const response=await fetch(url);
const data =await response.json();
console.log(data); 
const icon = allicons[data.weather[0].icon] || clear_icon      
setwaetherdata({
    humidity:data.main.humidity,
    windspeed:data.wind.speed,
    temperature:(data.main.temp),
    location:data.name,
    icon: icon

})
}
        catch(error){

        }
    }

    useEffect(()=>{

        search("London");
    },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt=""  onClick={()=>search(inputRef.current.value)}/>
        </div>
        <img src={weatherdata.icon} alt=""  className='weather-icon' />
        <p className='temp'>{weatherdata.temperature}c</p>
        <p className='location'>{weatherdata.location}</p>
<div className="weather-data">
<div className="col">
<img src={humidity_icon} alt="" />
<div>
    <p>{weatherdata.humidity}%</p>
    <span>Humidity</span>
</div>
</div>
<div className="col">
<img src={wind_icon} alt="" />
<div>
    <p>{weatherdata.windspeed} km/h</p>
    <span>wind speed</span>
</div>
</div>
</div>
    </div>
  )
}

export default Weather