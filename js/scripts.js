/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    //
// Scripts
//

import { showGraph } from '../assets/demo/chart-area-demo.js';
import { showBarGraph } from '../assets/demo/chart-bar-demo.js';

// ... (your imports)
class Dashboard {
    constructor() {
        
        document.getElementById("all-content").style.display = "none";
        document.getElementById("close-model").onclick = this.closeModel.bind(this);
        this.long = "";
        this.lat = "";
        
        
    }

    closeModel = () => {

        document.getElementById("all-content").style.display = "none";
        document.getElementById("popup-container").style.display = "none";
        document.getElementById("spinner-container").style.display = "flex";
        setInterval(this.updateDash.bind(this), 5000);
        this.getCoordinates()
        .then(() => {
           this.getForecast();
           this.getAQ();
        
    })    
    
    }

    updateDash(){
        this.getAirQuality();
           this.updateWeather();
           
        
        
    }

    getForecast() {
        const latitude = this.lat;
        const longitude = this.long;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_days=1`;
         fetch(url)
            .then(response => response.json())
            .then(data => {
                const hourlyData = data.hourly.time;
                let x = [];
                for (let i = 0; i < hourlyData.length; i++) {
                    const dateTimeString = hourlyData[i];
                    const date = new Date(Date.parse(dateTimeString));
                    const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                    x[i] = formattedTime;
                }
                let y = data.hourly["temperature_2m"];
                showGraph(x, y);
            })
            .catch(error => console.error(error));
    }

    updateWeather() {
        var locationInput = document.getElementById('locationInput').value;

        var weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=4c80fc5796594d96d997ae47b1620de4`;

        fetch(weatherEndpoint)
            .then(response => response.json())
            .then(data => {
                var temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
                var weatherDescription = data.weather[0].description;
                document.getElementById('weatherData').innerHTML = temperature + '°C';
                document.getElementById('weatherInfo').innerHTML = 'Weather: ' + weatherDescription;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weatherData').innerHTML = 'Error';
            });
    }

    async getCoordinates() {
        var locationInput = document.getElementById('locationInput').value;
        var nominatimEndpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`;
        let response = await fetch(nominatimEndpoint)
        let data = await response.json();
        var latitude = data[0].lat;

        var longitude = data[0].lon;
        this.long = longitude;
        this.lat = latitude;
    }
    getAQ() {
  const latitude = this.lat; // Replace with the latitude of the location you want to check
  const longitude = this.long; // Replace with the longitude of the location you want to check
  const hourly = 'pm10,pm2_5'; // Replace with the hourly air quality variables you are interested in
  const today = new Date().toISOString().slice(0, 10); // Get today's date in ISO format
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=${hourly}&start_date=${today}&end_date=${today}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const airQuality = JSON.stringify(data);
      const hourlyData = data.hourly.time;
                let x = [];
                for (let i = 0; i < hourlyData.length; i++) {
                    const dateTimeString = hourlyData[i];
                    const date = new Date(Date.parse(dateTimeString));
                    const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                    x[i] = formattedTime;
                }
                let y = data.hourly["pm10"];
                showBarGraph(x, y);
    })
    .catch(error => console.error(error));
}
// Define a function to get the current air quality level
getAirQuality() {
  // Define the API endpoint with the parameters
  let lat = this.lat;
  let lon = this.long;
  let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=4c80fc5796594d96d997ae47b1620de4`;
  // Use fetch to send a GET request to the API
  fetch(url)
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      // Extract the AQI value from the data
      let aqi = data.list[0].components.pm10;
      // Display the AQI value in the console
      document.getElementById("airQualityData").innerHTML = aqi;
      document.getElementById("aq-desc").innerHTML = this.getPM10Description(aqi);
      document.getElementById("spinner-container").style.display = "none";
            document.getElementById("all-content").style.display = "block";

    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
    }
  getPM10Description(pm10) {
  if (pm10 <= 50) return 'Good';
  if (pm10 <= 100) return 'Moderate';
  if (pm10 <= 250) return 'Unhealthy for Sensitive Groups';
  if (pm10 <= 350) return 'Unhealthy';
  if (pm10 <= 430) return 'Very Unhealthy';
  return 'Hazardous';
}


}
function showLogin(){
    document.getElementById("popup-container").style.display = "none";
    document.getElementById("loginCon").style.display = "block";


}
function changeUi() {
    if (document.forms["form"]["auth"].value == "login") {
        document.getElementById("username").style.display = "block";
        document.forms["form"]["auth"].value ="reg";
        document.forms["form"]["sub"].innerHTML ="Register";
        document.querySelector("#login-reg").innerHTML = "Already have an account? Log In...";
    } else if (document.forms["form"]["auth"].value == "reg") {
        document.getElementById("username").style.display = "none";
        document.forms["form"]["auth"].value ="login";
        document.forms["form"]["sub"].innerHTML = "Log In";
        document.querySelector("#login-reg").innerHTML= "Don't have an account? Register...";
    }
}





window.addEventListener('DOMContentLoaded', event => {
    let dash = new Dashboard();
    document.getElementById("close-model").onclick = dash.closeModel;
    document.getElementById("login-reg").onclick = changeUi;
    document.getElementById("show-login").onclick = showLogin;
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
        });
    }
});