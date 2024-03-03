const apiKey = '29f9dce87a1954e79528dc831467555b'; 

const searchButton = document.getElementById('search-button');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    getWeather(location);
});

async function getWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        const weatherData = await response.json();

        const { main, name, weather } = weatherData;
        const { temp, feels_like, humidity } = main;
        // Convert temperature from Kelvin to Celsius
        const tempCelsius = temp - 273.15;
        const feelsLikeCelsius = feels_like - 273.15;
        const { description } = weather[0];

        weatherInfo.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${tempCelsius.toFixed(2)}°C</p>
            <p>Feels like: ${feelsLikeCelsius.toFixed(2)}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Condition: ${description}</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again.'+error+'</p>';
    }
}