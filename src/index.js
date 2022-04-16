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

let itIsCurrently = document.querySelector("span#current-time");
newTime(itIsCurrently);

// Add a search engine. When Searching for a city, display the city's name on the page after the user submits the form.

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

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", showNewCity);

// Week 5 Homework: Implement the API
// Add button to return my current location data
// Add button to search different city data
// New data must be displayed on the page

// showMyLocationData function displays API data of my current location to the page
// Default when the page is refreshed

function showMyLocationData(response) {
  let temperature = Math.round(response.data.main.temp);
  let pageTemp = document.querySelector("#current-temp");
  pageTemp.innerHTML = `${temperature}°`;
  let city = response.data.name;
  let showCity = document.querySelector("#current-city");
  showCity.innerHTML = `${city}`;
  let tempDescription = response.data.weather[0].description;
  let pageDescription = document.querySelector("#description");
  pageDescription.innerHTML = `${tempDescription}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Retrieves API data to show my current position then triggers the showMyLocationData function above

function showMyPosition(myPosition) {
  let lat = myPosition.coords.latitude;
  let lon = myPosition.coords.longitude;
  let units = "metric";
  let apiKey = "1ddee96cb9cdd98d6782030a19f0fff6";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showMyLocationData);
}

navigator.geolocation.getCurrentPosition(showMyPosition);

function triggerMyLocationButton(event) {
  event.preventDefault();
  let currentLocationButton = document.querySelector("#my-location-button");
  let currentCity = document.querySelector("#current-city");
  if (currentLocationButton) {
    currentCity.innerHTML =
      navigator.geolocation.getCurrentPosition(showMyPosition);
  }
}

let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", triggerMyLocationButton);

// Submit button that searches and displays different city data

function receiveCityName() {
  let input = document.querySelector("#entered-city");
  let cityName = input.value;
  let units = "metric";
  let apiKey = "1ddee96cb9cdd98d6782030a19f0fff6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showMyLocationData);
}
