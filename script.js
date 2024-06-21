const container = document.querySelector(".container");
const search = document.querySelector(".search-box");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", function () {
  const APIkey = "1218554f01fb7ee5f330710618f09c74";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}&lang=fa`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }
      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");
      const image = document.querySelector(".weather-box img");
      const temprature = document.querySelector(".weather-box .temp");
      const description = document.querySelector(".weather-box .desc");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear": {
          image.src = "./pics/clear.png";
          break;
        }
        case "Rain": {
          image.src = "./pics/rain.png";
          break;
        }
        case "Snow": {
          image.src = "./pics/snow.png";
          break;
        }
        case "Clouds": {
          image.src = "./pics/cloud.png";

          break;
        }
        case "Misty": {
          image.src = "./pics/mist.png";

          break;
        }
        case "Haze": {
          image.src = "./pics/mist.png";

          break;
        }
        default: {
          image.src = "./pics/cloud.png";
        }
      }
      temprature.innerHTML = `${parseInt(json.main.temp)}<span>C°</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.feels_like}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}`;
    });
});
