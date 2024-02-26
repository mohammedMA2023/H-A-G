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
import { dispTable } from '../js/datatables-simple-demo.js';

// ... (your imports)
class Dashboard {
    constructor() {
        
        document.getElementById("all-content").style.display = "none";
        document.getElementById("close-model").onclick = this.closeModel.bind(this);
        this.long = "";
        this.lat = "";
        this.loc = "";
        
        
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
           this.fetchPollen(); 
           this.getPOP();
           this.showTable();
           
        })    
    
    }

    updateDash(){
        
        this.getAirQuality();
        this.showWeather();
           
        
        
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

    async updateWeather() {
        var locationInput = document.getElementById('locationInput').value;
        var weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=4c80fc5796594d96d997ae47b1620de4`;
    let response = await fetch(weatherEndpoint);
    let data = await response.json();
    var temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
    var weatherDescription = data.weather[0].description;
    return [temperature,weatherDescription];
   }
           

    async getCoordinates() {
        var locationInput = document.getElementById('locationInput').value;
        var nominatimEndpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`;
        let response = await fetch(nominatimEndpoint);
        let data = await response.json();
        var latitude = data[0].lat;

        var longitude = data[0].lon;
        this.long = longitude;
        this.lat = latitude;
        return "done";
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
async fetchAQ(){ 
    let lat = this.lat;
  let lon = this.long;

  let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=4c80fc5796594d96d997ae47b1620de4`;
  // Use fetch to send a GET request to the API
  let response = await fetch(url)
  let data = await response.json();

      let aqi = data.list[0].components.pm10;
      return aqi;
    }
   
    async fetchPollen(){ 
       let particulate_param = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${this.lat}&longitude=${this.long}&hourly=pm10,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen`

       let response = await fetch(particulate_param);
       let data = await response.json();
       let sum = 0;
       
       
              for (let index in data['hourly']['alder_pollen'].slice(0,24)){
                                                    // alert(JSON.stringify(data['hourly']['alder_pollen'][index]));
                                                    sum += data['hourly']['alder_pollen'][index];
                                                                                                      
                                                    }
                                                    document.getElementById("pollenData").innerHTML = Math.round(sum * 100) / 100 + " µg/m³";

                                                
                                             }
    showWeather(){
        this.updateWeather()
    .then(weatherData => {
    document.getElementById("weatherData").innerHTML = weatherData[0] + " °C";
      document.getElementById("weatherInfo").innerHTML = weatherData[1];
      async getPOP(){
        const apiKey = '4c80fc5796594d96d997ae47b1620de4'; // Replace with your OpenWeatherMap API key
const city = document.getElementById("locationInput").value; // Replace with your desired city
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

let response = await fetch(url);
  let data = await response.json();
  document.getElementById("windSpeed").innerHTML = data.wind.speed + " m/s";
      }
})


    }
getAirQuality() {
    this.fetchAQ()
    .then(aqi => {
    document.getElementById("airQualityData").innerHTML = aqi + " µg/m³";
      document.getElementById("aq-desc").innerHTML = this.getPM10Description(aqi);
      
            
})
    
}
  getPM10Description(pm10) {
  if (pm10 <= 50) return 'Good';
  if (pm10 <= 100) return 'Moderate';
  if (pm10 <= 250) return 'Unhealthy for Sensitive Groups';
  if (pm10 <= 350) return 'Unhealthy';
  if (pm10 <= 430) return 'Very Unhealthy';
  return 'Hazardous';
}
async showTable() {
    let majorCities = [
        ["New York", "US"],
        ["Tokyo", "JP"],
        ["London", "GB"],
        ["Paris", "FR"],
        ["Beijing", "CN"],
        ["Sydney", "AU"],
        ["Cairo", "EG"],
        ["Rio de Janeiro", "BR"],
        ["Moscow", "RU"],
        ["Cape Town", "ZA"]
    ];

    let table = document.getElementById("tableData");
    let tableContents = `
    <table id='datatablesSimple'>
    <thead>
            <tr>
                <th>Location</th>
                <th>Weather</th>
                <th>Air Quality (PM10)</th>
            </tr>
        </thead>
       
        <tbody>
    `;
    let oldLoc = document.getElementById('locationInput').value;
    try {    
    for (let index in majorCities) {
            document.getElementById('locationInput').value = majorCities[index][0] + "," + majorCities[index][1];

            // Call getCoordinates first to ensure we have latitude and longitude
            await this.getCoordinates();
            
            let tempData = await this.updateWeather();
            let temp = tempData[0];
            let tempDesc = tempData[1];

            let aqi = await this.fetchAQ();

            tableContents += `
                <tr>
                    <td>${majorCities[index]}</td>
                    <td>${temp} (${tempDesc})</td>
                    <td>${aqi} (${this.getPM10Description(aqi)})</td>
                </tr>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
    }

    tableContents += `</tbody></table>`;
    table.innerHTML = tableContents;
    this.loc = document.getElementById("locationInput");
    document.getElementById("locationInput").value = oldLoc;
    this.showWeather();
    dispTable();
    document.getElementById("spinner-container").style.display = "none";
    document.getElementById("all-content").style.display = "block";

}

}




// Function to show login
function showLogin() {
    document.getElementById("popup-container").style.display = "none";
    document.getElementById("loginCon").style.display = "block";
}

// Function to toggle UI
function changeUi() {
    if (document.forms["form"]["auth"].value == "login") {
        document.getElementById("username").style.display = "block";
        document.getElementById("loc").style.display = "inline";
        document.forms["form"]["auth"].value = "reg";
        document.forms["form"]["sub"].innerHTML = "Register";
        document.querySelector("#login-reg").innerHTML = "Already have an account? Log In...";
    } else if (document.forms["form"]["auth"].value == "reg") {
        document.getElementById("username").style.display = "none";
        document.getElementById("loc").style.display = "none";  
        document.forms["form"]["auth"].value = "login";
        document.forms["form"]["sub"].innerHTML = "Log In";
        document.querySelector("#login-reg").innerHTML = "Don't have an account? Register...";
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