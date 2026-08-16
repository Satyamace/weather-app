document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityDisplayName = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    //server may throw an error
    //server is always in another continent(it takes time to response for the request)

    try {
      const weatherData = await fetchWeatherData(city);
      showWeatherData(weatherData);
      cityInput.value = "";
    } catch (error) {
      console.error(error.message);

      showError();
    }
  });
  async function fetchWeatherData(cityName) {
    const url = `https://weather-app-satyam-337c.vercel.app/api/weather?city=${encodeURIComponent(cityName)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("city not found");
    }

    const result = await response.json();

    return result;
  }

  function showWeatherData(data) {
    //display weather data
    console.log(data);
    const { name, main, weather } = data;
    cityDisplayName.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
