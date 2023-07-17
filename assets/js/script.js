
const apiKey = '312ef17758b755a8564935f0cd1d338b'; // Replace with your own OpenWeatherMap API key

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('city-input').value;
  searchWeather(city);
});

// Function to search for weather data
function searchWeather(city) {
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Make an API call to retrieve weather data for the given city
  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      // Display the current weather conditions
      const currentWeather = getCurrentWeather(data);
      displayCurrentWeather(currentWeather);

      // Fetch the 5-day forecast data
      const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      return fetch(forecastEndpoint);
    })
    .then(response => response.json())
    .then(data => {
      // Display the 5-day forecast
      const forecast = getForecast(data);
      displayForecast(forecast);

      // Add the city to the search history
      addToSearchHistory(city);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to extract current weather data from the API response
function getCurrentWeather(data) {
  // Extract the necessary data from the API response and return it as an object
  const currentWeather = {
    city: data.name,
    date: formatDate(data.dt),
    weather: data.weather[0].main,
    temperature: `${kelvinToCelsius(data.main.temp)}°C`,
    humidity: `${data.main.humidity}%`,
    windSpeed: `${data.wind.speed} km/h`
  };

  return currentWeather;
}

// Function to extract forecast data from the API response
function getForecast(data) {
  // Extract the necessary data from the API response and return it as an array of objects
  const forecast = [];

  for (let i = 0; i < data.list.length; i += 8) {
    const forecastItem = {
      date: formatDate(data.list[i].dt),
      weather: data.list[i].weather[0].main,
      temperature: `${kelvinToCelsius(data.list[i].main.temp)}°C`,
      humidity: `${data.list[i].main.humidity}%`,
      windSpeed: `${data.list[i].wind.speed} km/h`
    };

    forecast.push(forecastItem);
  }

  return forecast;
}

// Function to format the date
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Function to convert temperature from Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

// Rest of the code remains the same
// ...

// // Event listener for form submission
// document.getElementById('search-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const city = document.getElementById('city-input').value;
//     searchWeather(city);
//   });
  
//   // Function to search for weather data
//   function searchWeather(city) {
//     // Simulate API call and data retrieval
//     const currentWeather = simulateCurrentWeather(city);
//     const forecast = simulateForecast(city);
  
//     // Display the current weather conditions
//     displayCurrentWeather(currentWeather);
  
//     // Display the 5-day forecast
//     displayForecast(forecast);
  
//     // Add the city to the search history
//     addToSearchHistory(city);
//   }
  
//   // Function to simulate current weather data
//   function simulateCurrentWeather(city) {
//     // Simulated data
//     return {
//       city: city,
//       date: '2023-07-15',
//       weather: 'Sunny',
//       temperature: '25°C',
//       humidity: '50%',
//       windSpeed: '10 km/h'
//     };
//   }
  
//   // Function to simulate forecast data
//   function simulateForecast(city) {
//     // Simulated data
//     return [
//       {
//         date: '2023-07-16',
//         weather: 'Cloudy',
//         temperature: '24°C',
//         humidity: '55%',
//         windSpeed: '12 km/h'
//       },
//       {
//         date: '2023-07-17',
//         weather: 'Rainy',
//         temperature: '20°C',
//         humidity: '60%',
//         windSpeed: '15 km/h'
//       },
//       {
//         date: '2023-07-18',
//         weather: 'Sunny',
//         temperature: '28°C',
//         humidity: '45%',
//         windSpeed: '8 km/h'
//       },
//       {
//         date: '2023-07-19',
//         weather: 'Partly Cloudy',
//         temperature: '26°C',
//         humidity: '50%',
//         windSpeed: '10 km/h'
//       },
//       {
//         date: '2023-07-20',
//         weather: 'Sunny',
//         temperature: '27°C',
//         humidity: '48%',
//         windSpeed: '9 km/h'
//       }
//     ];
//   }
  
//   // Function to display current weather conditions
//   function displayCurrentWeather(current) {
//     const currentWeatherElement = document.getElementById('current-weather');
//     currentWeatherElement.innerHTML = `
//       <h2>${current.city}</h2>
//       <p>Date: ${current.date}</p>
//       <p>Weather: ${current.weather}</p>
//       <p>Temperature: ${current.temperature}</p>
//       <p>Humidity: ${current.humidity}</p>
//       <p>Wind Speed: ${current.windSpeed}</p>
//     `;
//   }
  
//   // Function to display the 5-day forecast
//   function displayForecast(forecast) {
//     const forecastElement = document.getElementById('forecast');
//     forecastElement.innerHTML = '';
  
//     for (let day of forecast) {
//       forecastElement.innerHTML += `
//         <div>
//           <h3>${day.date}</h3>
//           <p>Weather: ${day.weather}</p>
//           <p>Temperature: ${day.temperature}</p>
//           <p>Humidity: ${day.humidity}</p>
//           <p>Wind Speed: ${day.windSpeed}</p>
//         </div>
//       `;
//     }
//   }
  
//   // Function to add the city to the search history
//   function addToSearchHistory(city) {
//     const searchHistoryElement = document.getElementById('search-history');
//     const cityElement = document.createElement('p');
//     cityElement.textContent = city;
//     searchHistoryElement.appendChild(cityElement);
  
//     // Add event listener to the city element
//     cityElement.addEventListener('click', function() {
//       searchWeather(city);
//     });
//   }
 ///////////////////////////////////////////////////////////////////////////////////////////// 
// const apiKey = '312ef17758b755a8564935f0cd1d338b';

// // Event listener for form submission
// document.getElementById('search-form').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const city = document.getElementById('city-input').value;
//   searchWeather(city);
// });

// // Function to search for weather data
// function searchWeather(city) {

//   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
//     .then(response => response.json())
//     .then(data => {
//       // Display the current weather conditions
//       displayCurrentWeather(data.current);

//       // Display the 5-day forecast
//       displayForecast(data.forecast);

//       // Add the city to the search history
//       addToSearchHistory(city);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// // Function to display current weather conditions
// function displayCurrentWeather(current) {
//   const currentWeatherElement = document.getElementById('current-weather');
//   currentWeatherElement.innerHTML = `
//     <h2>${current.city}</h2>
//     <p>Date: ${current.date}</p>
//     <p>Weather: ${current.weather}</p>
//     <p>Temperature: ${current.temperature}</p>
//     <p>Humidity: ${current.humidity}</p>
//     <p>Wind Speed: ${current.windSpeed}</p>
//   `;
// }

// // Function to display the 5-day forecast
// function displayForecast(forecast) {
//   const forecastElement = document.getElementById('forecast');
//   forecastElement.innerHTML = '';

//   for (let day of forecast) {
//     forecastElement.innerHTML += `
//       <div>
//         <h3>${day.date}</h3>
//         <p>Weather: ${day.weather}</p>
//         <p>Temperature: ${day.temperature}</p>
//         <p>Humidity: ${day.humidity}</p>
//         <p>Wind Speed: ${day.windSpeed}</p>
//       </div>
//     `;
//   }
// }

// // Function to add the city to the search history
// function addToSearchHistory(city) {
//   const searchHistoryElement = document.getElementById('search-history');
//   const cityElement = document.createElement('p');
//   cityElement.textContent = city;
//   searchHistoryElement.appendChild(cityElement);

//   // Add event listener to the city element
//   cityElement.addEventListener('click', function() {
//     searchWeather(city);
//   });
// }

///////////////////////////////////////////////////////////////////////////////////////////////


// const apiKey = '312ef17758b755a8564935f0cd1d338b';
//const apiAdress = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
// fetch(apiAdress)
// .then(response => response.json())
// .then(data => console.log(reponse)