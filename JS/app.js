var inputvalue = document.querySelector('#inputvalue');
var maindetails = document.querySelector('#maindetails');
var searchButton = document.querySelector('.fa-magnifying-glass');
var API_KEY = '21805bff7224936fa25d6cec016a0a4b';

async function fetchWeather() {
    var cityname = inputvalue.value.trim();
    if (!cityname) {
        maindetails.innerHTML = `<h1>Please enter a city name</h1>`;
        return;
    }
    try {
        var ApiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`);
        var jsondata = await ApiData.json();
        if (jsondata.cod == 200) {
            maindetails.innerHTML = `
        <div class="mainbox">
            <div class="for_img">
                <img src="https://openweathermap.org/img/wn/${jsondata.weather[0].icon}@2x.png" alt="Weather icon">
            </div>
            <div class="for_maincontent">
                <div class="weather-type">${jsondata.weather[0].main}</div>
                <div class="temp">${jsondata.main.temp}&deg;C</div>
                <div class="cityname">${jsondata.name}</div>
            </div>
            <div class="other-details">
                <div class="humidity">
                    <img src="IMAGES/humidity.png" alt="">
                    <div>
                        <div class="h-or-s">${jsondata.main.humidity}</div>
                        <div class="hors-text">Humidity</div>
                    </div>
                </div>
                <div class="wind-speed">
                    <img src="IMAGES/wind speed.png" alt="">
                    <div>
                        <div class="h-or-s">${jsondata.wind.speed} Km/hr</div>
                        <div class="hors-text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    `;
        } else {
            maindetails.innerHTML = `<h1>City not found</h1>`;
        }
    } catch (error) {
        maindetails.innerHTML = `<h1>Something went wrong</h1>`;
    }
    inputvalue.value = '';
}
inputvalue.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});
searchButton.addEventListener('click', function() {
    fetchWeather();
});