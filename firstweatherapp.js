
// const request = 

// new Request('https://open-meteo.com/en/docs#hourly=temperature_2m,relative_humidity_2m,rain,wind_speed_80m&timezone=America%2FLos_Angeles', {
//     method: 'GET'
// })
// const response = fetch(request)

 
// fetch('https://open-meteo.com/en/docs#hourly=temperature_2m,relative_humidity_2m,rain,wind_speed_80m&timezone=America%2FLos_Angeles')
// .then((response) =>{
//     return response.json()
// })
// .then((dayo)=>{
//     var text = document.querySelector('.container')
//     text.innerHTML = dayo.activity
//     console.log(dayo);
// })
let currCity = "London"
let units = "metric"


//Selectors
let city = document.querySelector('.weather_city')
let dateTime = document.querySelector(".weather_datetime")
let weatherForecast = document.querySelector(".weather_forecast")
let weatherTemperature = document.querySelector(".weather_temperature")
let weatherIcon = document.querySelector(".weather_icon")
let weatherMinMax = document.querySelector(".weather_minmax")
let weatherRealFeel = document.querySelector(".weather_realfeel")
let weatherHumidity = document.querySelector(".weather_humdity")
let weatherWind = document.querySelector(".weather_wind")
let weatherPressure = document.querySelector(".weather_pressure")

//search
document.querySelector(".weather_search").addEventListener
('submit', e => {
    let search = document.querySelector(".weather_searchform")
    //prevent Default
    e.preventDefault()
    //changecurrent City
    currCity = search.value
    // get weatherForecast
    getWeather()
})

//units
document.querySelector(".weather_units_celsius").addEventListener
('click', ()=>{
    if(units!=="metric"){
        //change to metric
        units = "metric"
        // get weather forecast
        getWeather()
    }
})

document.querySelector(".weather_units_farenheit").addEventListener
('click', ()=>{
    if(units!=="imperial"){
        //change to imperial
        units = "imperial"
        // get weather forecast
        getWeather()
    }
})
//convert time zone
function covertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600
    const date = new Date (timestamp * 1000)

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone>= 0? "-": "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString(options)
}

//convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames
    (['en'], {type: 'region'})
    return regionNames.of(country)
}
function getWeather(){
    const API_KEY = '50e011a9acc81ee3ed08622ff8255a25'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res=>res.json()).then(data => 
{
    city.innerHTML = `${data.name},
    ${convertCountryCode(data.sys.country)}`

    dateTime.innerHTML = covertTimeStamp
    (data.dt, data.timeZone) 
    weatherForecast.innerHTML = `<p>${data.weather[0].main}`
    weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
    weatherMinMax = `<p>Min ${data.main.temp_min.toFixed()}&#176</p>
    <p>Max ${data.main.temp_max.toFixed()}&#176</p>`
    weatherRealFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    weatherHumidity.innerHTML = `${data.main.humidity}%`
    weatherWind.innerHTML = `${data.wind.speed}m/s`
    weatherPressure.innerHTML = `${data.main.pressure}hPa`
})
}
document.body.addEventListener('load', getWeather())