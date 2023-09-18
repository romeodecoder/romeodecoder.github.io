document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationInput");
    const searchButton = document.getElementById("searchButton");
    const locationName = document.getElementById("locationName");
    const weatherIcon = document.getElementById("weatherIcon");
    const currentTemperature = document.getElementById("currentTemperature");
    const temperatureUnit = document.getElementById("temperatureUnit");
    const weatherDescription = document.getElementById("weatherDescription");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("windSpeed");
    const errorMessage = document.getElementById("errorMessage");

    // Function to fetch weather data
    async function getWeatherData(location) {
        try {
            const apiKey = '47746a2b42e7391d781a30e049887128'; // Replace with your API key
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
            const data = await response.json();

            // Check if the request was successful
            if (response.ok) {
                errorMessage.textContent = '';
                locationName.textContent = data.name;
                weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                currentTemperature.textContent = data.main.temp.toFixed(1);
                weatherDescription.textContent = data.weather[0].description;
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;
                temperatureUnit.textContent = '\u00B0C';
            } else {
                // Display an error message
                errorMessage.textContent = 'Location not found. Please try again.';
                clearWeatherData();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
            clearWeatherData();
        }
    }

    // Function to clear weather data
    function clearWeatherData() {
        locationName.textContent = '';
        weatherIcon.src = '';
        currentTemperature.textContent = '';
        weatherDescription.textContent = '';
        humidity.textContent = '';
        windSpeed.textContent = '';
        temperatureUnit.textContent = '';
    }

    // Event listener for the search button
    searchButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        if (location !== '') {
            getWeatherData(location);
        } else {
            errorMessage.textContent = 'Please enter a location.';
            clearWeatherData();
        }
    });
});
