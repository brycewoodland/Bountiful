// Weather for the day
const LAT = 33.1215196;
const LON = -117.3505939;
const APIKEY = 'f69c814af7c03a68b651ec98b5b40807';

const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${APIKEY}&units=imperial`;

function displayWeather(weatherData) {
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    const temperature = weatherData.main.temp.toFixed(0);
    const windspeed = weatherData.wind.speed.toFixed(0);
    const humidity = weatherData.main.humidity.toFixed(0);

    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    let weatherDesc = document.querySelector('#weather-desc');
    weatherDesc.innerHTML = `Description: ${desc}`;

    let weatherTemp = document.querySelector('#weather-temp');
    weatherTemp.innerHTML = `${temperature}&deg;F | ${windspeed} mph`;

    let weatherHumid = document.querySelector('#weather-humid');
    weatherHumid.innerHTML = `Humidity: ${humidity}%`;
}

async function getWeather() {
    const response = await fetch(apiURL);
    const data = await response.json();
    displayWeather(data);
}

getWeather();


const forecastapiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=33.1215196&lon=-117.350593&appid=f69c814af7c03a68b651ec98b5b40807`;

function timestampToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

async function getWeatherForecast() {
    try {
        const response = await fetch(forecastapiURL);
        const data = await response.json();

        const forecastCard = document.getElementById('forecastCard');

        const filteredData = data.list.filter(item => {
            const forecastDate = new Date(item.dt * 1000);
            return forecastDate.getHours() === 9;
        });

        for (let i = 1; i <= 3; i++) {
            const forecastItem = document.createElement('section');
            const forecastDate = new Date(data.list[i * 8].dt * 1000);
            const forecastWeather = data.list[i * 8].weather[0];

            forecastItem.innerHTML = `
                <p>Date: ${forecastDate.toLocaleDateString()}</p>
                <img src="https://openweathermap.org/img/wn/${forecastWeather.icon}.png" alt="Icon">
                <p>Description: ${forecastWeather.description}<p>
                `;

                forecastCard.appendChild(forecastItem);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getWeatherForecast();