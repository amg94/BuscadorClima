let weather = {
  apiKey: "001931c5aa8b424c2acf74ee0ec6ea60",
  
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=es&units=metric&appid=" + this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No se encontró la ciudad.");
            throw new Error("No se encontró la ciudad.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, feels_like, temp_max, temp_min, pressure } = data.main;
      const { speed } = data.wind;

      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".temp_max").innerText = "Temperatura máxima: " + temp_max + "°C";
      document.querySelector(".temp_min").innerText = "Temperatura mínima: " + temp_min + "°C";
      document.querySelector(".feels_like").innerText = "Sensación térmica: " + feels_like + "°C";
      document.querySelector(".pressure").innerText = "Presión atmosférica: " + pressure + "hPa";
      document.querySelector(".humidity").innerText = "Humedad actual: " + humidity + "%";
      document.querySelector(".wind").innerText = "Velocidad del viento: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Buenos Aires");