let searchInput = $("#form1");
let apiKey = "e8591343789ccc13a905593249f914a3";


// on click for search bar 
$("#searchBtn").click(function() {
    let cityName = searchInput.val();
    weather(cityName);
});

// fetches weather data and displays it on the page
function weather(cityName) {

    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    let apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

    // this fetches current weather data from OpenWeather 
    fetch(apiUrl1)
        // in case the search results in 404, prompt user to check spelling and try again
        .then(function (response){
            if (response.status === 404) {
                alert("Whoops! Looks like we didn't recognize that ciy. Please check your spelling and try again.")
            } else {
                return response;
            }
        })
        // if there's no 404... 
        .then(response => response.json())
        .then(function (weather) {
            let recentSearch = $(".recent-search").val();
            if (recentSearch == weather.name) {
                // do nothing, because this is already a saved 
            } else {
                //TODO: save to local storage
            
                $(".history").append("<input type=\"text\" readonly=\"true\" class=\"recent-search\" value=\"" + weather.name + "\"></input>");
            }

            let iconUrl = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";

            $(".city-name").text(weather.name);
            $(".city-name").append(" " + dayjs().format("MM/DD/YY"));
            $(".city-name").append(" " + "<img src=" + iconUrl + " alt=\"weather icon\">")
            $(".current-temp").text("Temperature: " + weather.main.temp + " °F");
            $(".current-hum").text("Humidity: " + weather.main.humidity + "%");
            $(".current-wind").text("Wind speed: " + weather.wind.speed + " mph");

            $(".current-section").addClass("current-class");

            // this will be used to fetch uv index information and forecast information
            let apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + weather.coord.lat + "&lon=" + weather.coord.lon + "&units=imperial&appid=" + apiKey;
            console.log(weather);
            fetch(apiUrl2)
                .then(response => response.json())
                .then(function (onecall) {
                    // displays uv index and adds class depending on value 
                    $(".current-uv").text("UV Index: ");
                    if (onecall.current.uvi < 3) {
                        $(".current-uv").append("<span class=\"uv-low\">" + onecall.current.uvi + "</span>");
                    } else if (3 >= onecall.current.uvi < 8) {
                        $(".current-uv").append("<span class=\"uv-moderate\">" + onecall.current.uvi + "</span>");
                    } else {
                        $(".current-uv").append("<span class=\"uv-high\">" + onecall.current.uvi + "</span>");
                    }
                    // creates forecast heading
                    if ($("#forecast-heading").text() === "5-Day Forecast:") {
                        // empty function because the heading has already been rendered 
                    } else {
                        $(".forecast-section").prepend("<h3 id=\"forecast-heading\">5-Day Forecast:</h3>");
                    };

                    // activates styling for forecast cards
                    $(".forecast").addClass("forecast-card");
                    
                    // for loop adds content to forecast cards
                    // i=1 because the 0th object is today's weather information and we want to start with tomorrow's
                    for (let i=1; i<6; i++) {
                        let forecastIconUrl = "http://openweathermap.org/img/wn/" + onecall.daily[i].weather[0].icon + "@2x.png";
                        //date
                        let forecastDate = onecall.daily[i].dt;
                        $(".date" + i).text(dayjs.unix(forecastDate).format("MM/DD/YY"));
                        $(".icon" + i).attr({"src": forecastIconUrl, "alt": "weather icon"});
                        $(".temp" + i).text("Temp: " + onecall.daily[i].temp.max + " °F");
                        $(".hum" + i).text("Hum: " + onecall.daily[i].humidity + "%");
                    };
                });
        });
};

function renderHistory() {

};
renderHistory();