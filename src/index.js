let now = new Date();
let day = document.querySelector("#day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let getDay = days[now.getDay()];
day.innerHTML = `${getDay},`;

let month = document.querySelector("#month");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let getMonth = months[now.getMonth()];
month.innerHTML = `${getMonth}`;

let date = document.querySelector("#date");
let getDate = now.getDate();
date.innerHTML = `${getDate},`;

let year = document.querySelector("#year");
let getFullYear = now.getFullYear();
year.innerHTML = `${getFullYear}`;

let time = document.querySelector("#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hours}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchCity(city) {
  let apiKey = "be2dbbf8a235e9c4858679a1d6278605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text-input").value;
  searchCity(city);
}

let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#degrees");
  let cityElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#weather");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon"); 
  
celciusTemperature = response.data.main.temp;


  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity + " %";
  windElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
 }

 function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "be2dbbf8a235e9c4858679a1d6278605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let currentLocationButton = document.querySelector("#buttonLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);


function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

searchCity("Toronto");
