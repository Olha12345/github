function formatDate() {
  let today = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  let month = months[today.getMonth()];
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = today.getDate();
  let year = today.getFullYear();
  let currentDateTime = `${day} at ${hour}:${minutes}, ${month} ${date}, ${year}`;

  return currentDateTime;
}
let todayDate = document.querySelector("#today");
todayDate.innerHTML = formatDate(new Date());

function showTempCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let currentTemp = document.querySelector("#current-temp");
  let cityName = document.querySelector("#city");
  let descriptionCondition = document.querySelector("#current-condition");
  let TempRange = document.querySelector("#current-temp-range");
  let humidityLevel = document.querySelector("#humidity-level");
  let windLevel = document.querySelector("#wind-level");

  cityName.innerHTML = `${city},`;
  currentTemp.innerHTML = `${temperature}`;
  descriptionCondition.innerHTML = `${description} `;
  TempRange.innerHTML = `${minTemp}°|${maxTemp}°`;
  humidityLevel.innerHTML = `${humidity}%`;
  windLevel.innerHTML = `${wind} km/h`;

  let todayDate = document.querySelector("#today");
  todayDate.innerHTML = formatDate(new Date());
}

function retrieveCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city").value;
  let units = "metric";
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTempCity);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", retrieveCity);

function showCurrentTempCity(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currentCityName = response.data.name;
  let description = response.data.weather[0].description;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let currentTemp = document.querySelector("#current-temp");
  let currentCity = document.querySelector("#city");
  let descriptionCondition = document.querySelector("#current-condition");
  let TempRange = document.querySelector("#current-temp-range");
  let humidityLevel = document.querySelector("#humidity-level");
  let windLevel = document.querySelector("#wind-level");

  currentTemp.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${currentCityName},`;
  descriptionCondition.innerHTML = `${description} `;
  TempRange.innerHTML = `${minTemp}°|${maxTemp}°`;
  humidityLevel.innerHTML = `${humidity}%`;
  windLevel.innerHTML = `${wind} km/h`;

  let todayDate = document.querySelector("#today");
  todayDate.innerHTML = formatDate(new Date());
}

function retrievePosition(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTempCity);
}

let currentButton = document.querySelector("#btn-current");
currentButton.addEventListener("click", retrievePosition);
