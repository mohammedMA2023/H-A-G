import { showGraph } from '../assets/demo/chart-area-demo.js';
import { showBarGraph } from '../assets/demo/chart-bar-demo.js';
import { dispTable } from '../js/datatables-simple-demo.js';
class LoadingScreen {
    constructor(){
        this.spinner = document.getElementById("spinner-container");
        this.allContent = document.getElementById("all-content");
    }
    startLoad(){
        this.allContent.style.display = "none";
        this.spinner.style.display = "flex";
    }
    endLoad(){
        this.allContent.style.display = "block";
        this.spinner.style.display = "none";
    }

}
class Dashboard {
    constructor() {
        this.long = "";
        this.lat = "";
        this.loc = "";
        this.load = new LoadingScreen();
        this.times = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        this.showTable = async () => {
    let majorCities = [
        "New York, US",
        "Tokyo, JP",
        "London, GB",
        "Paris, FR",
        "Beijing, CN",
        "Sydney, AU",
        "Cairo, EG",
        "Rio de Janeiro, BR",
        "Moscow, RU",
        "Cape Town, ZA"
    ];

    let table = document.getElementById("t-bdy");
    let tableContents = "";
    try {
    for (let index in majorCities) {
            this.changeLoc(majorCities[index]);
            await this.getCoordinates(); // Call getCoordinates first to ensure we have latitude and longitude
            let tempData = await this.updateWeather();
            let temp = tempData[0];
            let tempDesc = tempData[1];
            let aqi = await this.fetchAQ();
            tableContents += `
                <tr>
                    <td>${majorCities[index]}</td>
                    <td>${temp} (${tempDesc})</td>
                    <td>${aqi}</td>
                </tr>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        }
    table.innerHTML = tableContents;
    dispTable();
    }
    }

    changeLoc(loc) {
        this.loc = loc;


    }
    closeModel = () => {
        document.getElementById("popup-container").style.display = "none";
        this.load.startLoad();
        this.getCoordinates()
        .then(() => {
           this.getForecast();
           this.getAQ();
           this.fetchPollen(); 

           this.getAirQuality();
        this.showWeather();

        })
        .then(() =>{
            this.load.endLoad();

        })

     }


    getForecast() {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.long}&hourly=temperature_2m&forecast_days=1`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const hourlyData = data.hourly.time;
            //this.times = hourlyData.map(dateTimeString => new Date(Date.parse(dateTimeString)).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
            //alert(JSON.stringify(this.times));
            const temperatures = data.hourly["temperature_2m"];
            showGraph(this.times, temperatures);
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
    return [temperature,weatherDescription,data.wind.speed];
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

        showBarGraph(this.times, data.hourly["pm10"]);

    })
    .catch(error => console.error(error));
}

async fetchAQ(){ // Define a function to get the current air quality level
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
        sum += data['hourly']['alder_pollen'][index];
        }
    document.getElementById("pollenData").innerHTML = Math.round(sum * 100) / 100 + " µg/m³";

        }
    
    showWeather(){
        this.updateWeather()
    .then(weatherData => {
    document.getElementById("weatherData").innerHTML = weatherData[0] + " °C";
      document.getElementById("weatherInfo").innerHTML = weatherData[1];
      document.getElementById("windSpeed").innerHTML = weatherData[2] + 'm/s';    
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

}

function showLogin() { // Function to show login
    document.getElementById("popup-container").style.display = "none";
    document.getElementById("loginCon").style.display = "block";
}

function changeUi() { // Function to toggle UI
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
    document.getElementById("ShowTable").onclick = dash.showTable;
    document.getElementById("show-login").onclick = showLogin;
    const sidebarToggle = document.body.querySelector('#sidebarToggle'); // Toggle the side navigation
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
        });
    }
});