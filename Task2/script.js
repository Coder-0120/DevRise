const API_KEY = "176791fd579330fe1518dfa8ce0571c1";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    loading.style.display = "block";
    weatherResult.style.display = "none";
    error.style.display = "none";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (err) {

        showError(err.message);

    } finally {

        loading.style.display = "none";

    }
}

function displayWeather(data) {

    cityName.innerHTML = `${data.name}, ${data.sys.country}`;

    temperature.innerHTML = `${Math.round(data.main.temp)}°C`;

    description.innerHTML = data.weather[0].description;

    feelsLike.innerHTML = `${Math.round(data.main.feels_like)}°C`;

    humidity.innerHTML = `${data.main.humidity}%`;

    wind.innerHTML = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    pressure.innerHTML = `${data.main.pressure} hPa`;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    sunrise.innerHTML = formatTime(data.sys.sunrise);

    sunset.innerHTML = formatTime(data.sys.sunset);

    changeBackground(data.weather[0].main);

    weatherResult.style.display = "block";
}

function showError(msg) {

    error.innerHTML = msg;

    error.style.display = "block";

}

function formatTime(time) {

    return new Date(time * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

function changeBackground(weather) {

    document.body.className = "";

    switch (weather.toLowerCase()) {

        case "clear":
            document.body.classList.add("clear");
            break;

        case "clouds":
            document.body.classList.add("clouds");
            break;

        case "rain":
        case "drizzle":
            document.body.classList.add("rain");
            break;

        case "snow":
            document.body.classList.add("snow");
            break;

        case "thunderstorm":
            document.body.classList.add("thunderstorm");
            break;

        case "mist":
        case "fog":
        case "haze":
        case "smoke":
            document.body.classList.add("mist");
            break;

        default:
            break;
    }

}