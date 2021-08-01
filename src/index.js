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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-text-input");
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function convertToFar(event) {
  event.preventDefault();
  let farTemp = document.querySelector("#degrees");
  let degrees = farTemp.innerHTML;
  farTemp.innerHTML = Math.round((degrees * 9) / 5 + 32);
}

function convertToCel(event) {
  event.preventDefault();
  let celTemp = document.querySelector("#degrees");
  celTemp.innerHTML = 25;
}

let farTemp = document.querySelector("#far");
farTemp.addEventListener("click", convertToFar);

let celTemp = document.querySelector("#cel");
celTemp.addEventListener("click", convertToCel);

//WEATHER APP ADDITION GEOLOCATION

function showLocation(event) {
  let apiKey = "be2dbbf8a235e9c4858679a1d6278605";
  let city = document.querySelector("#city-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let passwordForm = document.querySelector("#search-form");
passwordForm.addEventListener("submit", showLocation);

//Real Time Temperature//
function showTemperature(response) {
  console.log(response);
  let city = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML =
    Math.round(response.data.main.feels_like) + " ºC";
  document.querySelector("#weather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML =
    response.data.wind.speed + " km/h";
  document.querySelector("#max-temp").innerHTML =
    Math.round(response.data.main.temp_max) + " ºc";
  document.querySelector("#min-temp").innerHTML =
    Math.round(response.data.main.temp_min) + " ºC";
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + " %";
  document.querySelector("h1").innerHTML = city;
}
