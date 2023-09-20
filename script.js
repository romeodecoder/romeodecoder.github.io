
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
    // Sound effect mapping
    const soundEffects = {
        rain: new Audio('WhatsApp Audio 2023-09-20 at 3.38.37 PM.mp3'), // Replace with the path to your rain sound effect file
        thunderstorm: new Audio('chillout-lounge-downtempo-cool-atmospheric-warm-relaxed-ambient-music-21040.mp3'), // Replace with the path to your thunderstorm sound effect file
        // Add more sound effects for other weather conditions if needed
    };
    let currentSoundEffect = null;


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
                playSoundEffect(data);
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
    
    // Function to play sound effect based on conditions
    function playSoundEffect(data) {
        const temperature = data.main.temp.toFixed(1);
        const humidityValue = data.main.humidity;
        if (currentSoundEffect) {
            currentSoundEffect.pause();
            currentSoundEffect.currentTime = 0;
            currentSoundEffect = null;
        }

        if (temperature >0 && temperature <= 100 && humidityValue >= 70) {
            currentSoundEffect = soundEffects.rain;
            soundEffects.rain.play();
        } 
        else if (temperature > 0 && temperature <= 100 && humidityValue <= 69) {
            currentSoundEffect = soundEffects.thunderstorm;
            soundEffects.thunderstorm.play();
        
        

        }
        else{
            currentSoundEffect = null;
        }
        // Add more conditions and sound effects as needed
    }
    // Function to stop the current sound effect
function stopCurrentSoundEffect() {
    if (currentSoundEffect) {
        currentSoundEffect.pause();
        currentSoundEffect.currentTime = 0;
        currentSoundEffect = null;
    }
}

    // Event listener for the search button
    searchButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        if (location !== '') {
            getWeatherData(location);
            playSoundEffect()
        } else {
            errorMessage.textContent = 'Please enter a location.';
           
            clearWeatherData();
             stopCurrentSoundEffect()
        }
    });
    
});
