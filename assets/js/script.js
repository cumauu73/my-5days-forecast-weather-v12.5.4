var apiKey = '312ef17758b755a8564935f0cd1d338b'
var fetchCurrent = 'https://api.openweathermap.org/data/2.5/weather?q='
var fetchForecast = 'https://api.openweathermap.org/data/2.5/forecast?q='
var searchBtn = document.querySelector('button')
var cityinput = document.getElementById('cityinput')
var searched = cityinput.value

// click listener for search button
searchBtn.addEventListener('click', function (event) {
    var searched = cityinput.value
    event.preventDefault()
    getForecastByFetch(searched)
    getCurrentWeatherByFetch(searched)

});


// when user press ENTER key same to click
cityinput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});




// Current Weather Function
function getCurrentWeatherByFetch(cityName) {
    fetch(fetchCurrent + cityName + '&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {

            console.log(weatherData)
            // Gets current Weather Icon
            var iconID = weatherData.weather[0].icon
            var iconImg = document.createElement('img')
            iconImg.src = 'https://openweathermap.org/img/wn/' + iconID + '.png'
            
            // Gets city name
            var city = weatherData.name
            var cityEl = document.createElement('h3')
            cityEl.innerText = 'Current weather for: ' + city
            searched.appendChild(cityEl)

            // Current Sky Conditions
            var currentSkyCondition = weatherData.weather[0].main
            var currentSkyConditionEl = document.createElement('p')
            currentSkyConditionEl.classList.add('skydescription')
            currentSkyConditionEl.innerText = currentSkyCondition
            
            // Current Temp
            var currentTemp = weatherData.main.temp
            var currentTempEl = document.createElement('li')
            currentTempEl.innerText = "Temp: " + currentTemp
            
            // Current Humidity
            var currentHumidity = weatherData.main.temp
            var currentHumidityEl = document.createElement('li')
            currentHumidityEl.innerText = "Humidity: " + currentHumidity
            
            // Current windspeed
            var currentWindSpeed = weatherData.wind.speed
            var currentWindSpeedEl = document.createElement('li')
            currentWindSpeedEl.innerText = "Wind: " + currentWindSpeed
            
            // DOM appends
            var weatherCard = document.createElement('div')
            weatherCard.classList.add('currentWeatherCard')
            weatherCard.appendChild(iconImg)
            weatherCard.appendChild(currentSkyConditionEl)
            weatherCard.appendChild(currentTempEl)
            weatherCard.appendChild(currentHumidityEl)
            weatherCard.appendChild(currentWindSpeedEl)
            searched.appendChild(weatherCard)


        })
}



// Five Day Forecast Function
// function getForecastByFetch(cityName) {
//     fetch(fetchForecast + cityName + '&units=imperial&appid=' + apiKey)
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (weatherData) {


//             // Array to loop though API and give user elements at 12pm each day
//             var listArray = weatherData.list
//             for (var i = 0; i < listArray.length; i += 8) {
//                 // Icons
//                 var iconNumber = listArray[i].weather[0].icon
//                 var iconImg = document.createElement('img')
//                 iconImg.src = 'https://openweathermap.org/img/wn/' + iconNumber + '.png'

//                 // Date
//                 var date = listArray[i].dt_txt.split(' ')[0]
//                 var dateEl = document.createElement('p')
//                 dateEl.innerText = date

//                 // Temperature
//                 var temp = listArray[i].main.temp
//                 var tempEl = document.createElement('li')
//                 tempEl.innerText = 'Temp: ' + temp

//                 // Humidity
//                 var humidity = listArray[i].main.humidity
//                 var humidityEl = document.createElement('li')
//                 humidityEl.innerText = 'Humidity: ' + humidity

//                 // Wind Speed
//                 var windSpeed = listArray[i].wind.speed
//                 var windEl = document.createElement('li')
//                 windEl.innerText = "Wind: " + windSpeed + " mph"

//                 // Sky Condition
//                 var skyCondition = listArray[i].weather[0].main
//                 var skyConditionEl = document.createElement('p')
//                 skyConditionEl.classList.add('skydescription')
//                 skyConditionEl.innerText = skyCondition


//                 // DOM appends
//                 var forecastCard = document.createElement('div')
//                 forecastCard.classList.add('forecastCard')
//                 forecastCard.appendChild(iconImg)
//                 forecastCard.appendChild(skyConditionEl)
//                 forecastCard.appendChild(dateEl)
//                 forecastCard.appendChild(tempEl)
//                 forecastCard.appendChild(humidityEl)
//                 forecastCard.appendChild(windEl)
//                 forecastContainer.appendChild(forecastCard)

//             }
//         })
// }