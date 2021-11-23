const token = "69273a8a5ee6b16eee3269b6549c5d0e";
let api = "https://api.openweathermap.org/data/2.5/weather";
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const windspeed = document.querySelector(".wind");
const humidityStats = document.querySelector(".humidity");
const humidityStats2 = document.querySelector(".humidity2");
const icon = document.querySelector(".icon");
const icon2 = document.querySelector(".icon2");
const input = document.getElementById("search");

const ctx = document.getElementById("myChart");

let inputValue = "";
input.addEventListener("change", (e) => {
  inputValue = e.target.value;
  getWeather();
});

getWeather = async () => {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${token}`
  );
  const response = await data.json();

  toCelsius = (celsius) => {
    return Math.floor(celsius - 273.15);
  };

  let weatherId = response.weather[0].id;
  if (weatherId >= 200 && weatherId <= 232) {
    icon.classList.add("fas", "fa-bolt");
    icon2.classList.add("fas", "fa-bolt");
  } else if (weatherId >= 300 && weatherId <= 321) {
    icon.classList.add("fas", "fa-cloud-showers-heavy");
    icon2.classList.add("fas", "fa-cloud-showers-heavy");
  } else if (weatherId >= 500 && weatherId <= 531) {
    icon.classList.add("fas", "fa-cloud-showers-heavy");
    icon2.classList.add("fas", "fa-cloud-showers-heavy");
  } else if (weatherId >= 600 && weatherId <= 622) {
    icon.classList.add("fas", "fa-snowflake");
    icon2.classList.add("fas", "fa-snowflake");
  } else if (weatherId >= 701 && weatherId <= 781) {
    icon.classList.add("fas", "fa-smog");
    icon2.classList.add("fas", "fa-smog");
  } else if (weatherId === 800) {
    icon.classList.add("fas", "fa-sun");
    icon2.classList.add("fas", "fa-sun");
  } else {
    icon.classList.add("fas", "fa-cloud");
    icon2.classList.add("fas", "fa-cloud");
  }

  city.textContent = response.name;
  temp.textContent = toCelsius(response.main.temp);
  weather.textContent = response.weather[0].main;
  windspeed.textContent = `${response.wind.speed} /h`;
  humidityStats.textContent = `${response.main.humidity}%`;
  humidityStats2.textContent = `${response.main.humidity}%`;

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Today"],
      datasets: [
        {
          label: "Temperature",
          data: [toCelsius(response.main.temp)],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
};
function getLocation() {
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + token;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        toCelsius = (celsius) => {
          return Math.floor(celsius - 273.15);
        };
        city.textContent = data.name;
        temp.textContent = toCelsius(data.main.temp);
        weather.textContent = data.weather[0].main;
        windspeed.textContent = `${data.wind.speed} /h`;
        humidityStats.textContent = `${data.main.humidity}%`;
        humidityStats2.textContent = `${data.main.humidity}%`;

        const myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Today"],
            datasets: [
              {
                label: "Temperature",
                data: [toCelsius(data.main.temp)],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
              },
            },
          },
        });
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getLocation();
