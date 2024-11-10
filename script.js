const apiKey = 'YOUR_API_KEY';
const city = 'YOUR_CITY';

async function getWeatherData() {
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const currentWeatherData = await currentWeatherResponse.json();
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const forecastData = await forecastResponse.json();
    
    updateCurrentWeather(currentWeatherData);
    updateForecast(forecastData);
}

function updateCurrentWeather(data) {
    const videoElement = document.getElementById('current-video');
    const weatherDiv = document.getElementById('current-weather-data');
    const condition = data.weather[0].main;

    // Set video based on condition (e.g., clear, rain, snow)
    videoElement.src = getVideoForCondition(condition);
    weatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
    `;
}

function updateForecast(data) {
    const days = document.querySelectorAll('.forecast-day');
    for (let i = 0; i < days.length; i++) {
        const videoElement = days[i].querySelector('.forecast-video');
        const forecastDiv = days[i].querySelector('.forecast-data');
        const forecast = data.list[i * 8]; // 3-hour intervals, use one per day

        const condition = forecast.weather[0].main;
        videoElement.src = getVideoForCondition(condition);
        forecastDiv.innerHTML = `
            <h3>${new Date(forecast.dt_txt).toLocaleDateString()}</h3>
            <p>${forecast.weather[0].description}</p>
            <p>Temp: ${forecast.main.temp}°C</p>
        `;
    }
}

function getVideoForCondition(condition) {
    // Return video file paths based on weather condition
    switch (condition.toLowerCase()) {
        case 'clear':
            return 'videos/clear.mp4';
        case 'rain':
            return 'videos/rain.mp4';
        case 'snow':
            return 'videos/snow.mp4';
        // Add more cases as needed
        default:
            return 'videos/default.mp4';
    }
}

getWeatherData();
