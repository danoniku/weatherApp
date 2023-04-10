const apiKey = "920f4407688f95c37a001112dac724e1";
const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const body = document.querySelector("body");
const card = document.getElementById("card");

const searchBox = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");
let latitude;
let longitude;

var today = new Date(); //date
var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

document.querySelector(".getDate").innerHTML = dateTime;
console.log(today.getHours());

if (today.getHours() >= 20 && today.getHours() <= 8) {
    //tema by default in functie de ora curenta
    document.body.style.backgroundImage = "url('img/night1.png')";
    body.style.transition = "1s";
    card.classList.toggle("card-blue-gradient");
} else {
    document.body.style.backgroundImage = "url('img/day.png')";
    body.style.transition = "1s";
}

const successCallback = (position) => {
    console.log(position.coords);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(longitude, latitude);
    getInitialWeather(latitude, longitude); //initial weather in functie de lat si lot de pe API
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback); //functie principala locatie

async function checkWeather(city) {
    //in functie de oras
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        console.log(data);
    }
}

async function getInitialWeather(lat, long) {
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            long +
            `&appid=${apiKey}`
    );

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML =
            Math.round(data.main.temp - 273) + "°C"; //kelvin
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        console.log(data);
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

const toggle = document.getElementById("toggleDark");

console.log(card);
toggle.addEventListener("click", function () {
    this.classList.toggle("bi-moon");
    card.classList.toggle("card-blue-gradient");
    if (this.classList.toggle("bi-brightness-high-fill")) {
        //schimbare background
        document.body.style.backgroundImage = "url('img/night1.png')";
        //body.style.color = "white";
        // body.style.color = "white";
        body.style.transition = "1.5s";
    } else {
        // body.style.color = "black";
        document.body.style.backgroundImage = "url('img/day.png')";

        body.style.transition = "1.5s";
    }
});
