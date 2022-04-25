// Display the current day and time.
function newTime() {
  let oldTime = document.querySelector("span#current-time");
  let now = new Date();
  let hours = now.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  oldTime.innerHTML = `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Add search engine. When Searching for a city, display the city's name on the page after the user submits the form.

function showNewCity(event) {
  event.preventDefault();
  let input = document.querySelector("#entered-city");
  let currentCity = document.querySelector("#current-city");
  if (input.value) {
    receiveCityName();
    currentCity.innerHTML = `${input.value}`;
  } else {
    alert("Yikes, that's not a city!😅 Try again.");
  }
}

// function to display forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (weekdayForecast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weekday">${formatDay(weekdayForecast.dt)}</div>
          <div class="weathericons">
          <img src="https://openweathermap.org/img/wn/${
            weekdayForecast.weather[0].icon
          }@2x.png" alt="" width="42"/>
          </div>
          <div class="tempvalue">
            <span class="weather-forecast-max-temp">
              ${Math.round(weekdayForecast.temp.max)}°
            </span>
            <span class="weather-forecast-min-temp">
              ${Math.round(weekdayForecast.temp.min)}°
            </span>
          </div>
        </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1ddee96cb9cdd98d6782030a19f0fff6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Implement the API
// Add button to return my current location data
// Add button to search different city data
// New data must be displayed on the page
// showLocationData function displays API data of my current location to the page
// Default when the page is refreshed

function showLocationData(response) {
  let pageTemp = document.querySelector("#current-temp");
  let city = response.data.name;
  let showCity = document.querySelector("#current-city");
  let tempDescription = response.data.weather[0].description;
  let pageDescription = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  pageTemp.innerHTML = Math.round(celsiusTemperature);
  showCity.innerHTML = `${city}`;
  pageDescription.innerHTML = `${tempDescription}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

// Retrieves API data to show my current position then triggers the showMyLocationData function above

function showMyPosition(myPosition) {
  let lat = myPosition.coords.latitude;
  let lon = myPosition.coords.longitude;
  let units = "metric";
  let apiKey = "1ddee96cb9cdd98d6782030a19f0fff6";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocationData);
}

function triggerMyLocationButton(event) {
  event.preventDefault();
  let currentLocationButton = document.querySelector("#my-location-button");
  let currentCity = document.querySelector("#current-city");
  if (currentLocationButton) {
    currentCity.innerHTML =
      navigator.geolocation.getCurrentPosition(showMyPosition);
  }
}

// Submit button that searches and displays different city data

function receiveCityName() {
  let input = document.querySelector("#entered-city");
  let cityName = input.value;
  let units = "metric";
  let apiKey = "1ddee96cb9cdd98d6782030a19f0fff6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showLocationData);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  //remove active class from celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let itIsCurrently = document.querySelector("span#current-time");
newTime(itIsCurrently);

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", showNewCity);

navigator.geolocation.getCurrentPosition(showMyPosition);

let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", triggerMyLocationButton);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
