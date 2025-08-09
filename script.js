const apiKey = "016de935b9164dc30cf79bc99d3cff55";
const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector("input");
const cityNameEl = document.querySelector(".city-name");
const dateTimeEl = document.querySelector(".date-time");
const temp = document.querySelector(".temperature");
const windSpeedEl = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const weatherIconEl = document.querySelector(".weather-icon");
const description = document.querySelector(".description");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  console.log("search clicked city :", city);
  if (city) {
    getWeather(city);
  } else {
    console.warn("empty city input ");
    alert("please enter a city");
  }
});
async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;
    console.log("Fetch URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    console.log(data);
    cityNameEl.textContent = data.name;
    dateTimeEl.textContent = new Date().toLocaleString();
    temp.textContent = data.main.temp;
    windSpeedEl.textContent = data.wind.speed;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    description.textContent = data.weather[0].discription;

    humidity.textContent = `${data.main.humidity}%`;
  } catch (errr) {
    alert(errr);
  }
}
