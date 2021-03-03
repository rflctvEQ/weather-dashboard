let apiKey = "e8591343789ccc13a905593249f914a3"; 

// on click for search bar 

// fetches current weather data and displays it on the page
function currentWeather() {

    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    // let apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    //! this is just for kalamazoo 
    let apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=kalamazoo&appid=" + apiKey;

    fetch(apiUrl1)
        .then(response => response.json())
        .then(function (weather) {
            //! the values we'll get here are not the right metric (e.g., k instead of F)
            $(".current-temp").text(weather.main.temp + "°F");
            $(".current-hum").text(weather.main.humidity + "%");
            $(".current-wind").text(weather.wind.speed + " mph");
            console.log(weather);
        })
};

currentWeather();

// fetches 5-day forecast data and displays it on the page
function forecastWeather() {



    
};

// saves previous searches to local storage and creates buttons that can be clicked to run fetches on that search 
// TODO: I only want previous searches to be saved if they returned data from the API!