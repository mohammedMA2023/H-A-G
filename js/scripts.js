/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    //
// Scripts
//
function closeModel(){
    document.getElementById("popup-container").style.display = "none";
    getCoordinates();
    updateWeather();


}
import { showGraph } from '../assets/demo/chart-area-demo.js';
const latitude = 51.5; // Replace with your latitude
const longitude = -0.1; // Replace with your longitude
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_days=1`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const hourlyData = data.hourly.time;
    let x = [];

    //alert(JSON.stringify(data.hourly))
    for (let i = 0;i<hourlyData.length;i++){
        const dateTimeString = hourlyData[i];
        const date = new Date(Date.parse(dateTimeString));
        const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        //alert(formattedTime);
        x[i] = formattedTime;
        }
        let y = data.hourly["temperature_2m"];
        //alert(JSON.stringify(y));
        //alert(y.length);
        showGraph(x,y);
  })
  .catch(error => console.error(error));

function getCoordinates() {
       var locationInput = document.getElementById('locationInput').value;
       var nominatimEndpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`;


       fetch(nominatimEndpoint)
           .then(response => response.json())
           .then(data => {
               if (data && data.length > 0) {
                   var latitude = data[0].lat;
                   var longitude = data[0].lon;
                   alert(`Coordinates: Latitude - ${latitude}, Longitude - ${longitude}`);
               } else {
                   alert('Coordinates not found for the entered location.');
               }
           })
           .catch(error => {
               console.error('Error fetching coordinates:', error);
               alert('Error fetching coordinates. Please try again.');
           });
   }


   
   function updateWeather() {
       // Replace 'YOUR_API_KEY' and 'CITY_NAME' with your actual OpenWeatherMap API key and city name
       var locationInput = document.getElementById('locationInput').value;


       var weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=4c80fc5796594d96d997ae47b1620de4`;


       fetch(weatherEndpoint)
           .then(response => response.json())
           .then(data => {
               //alert(JSON.stringify(data.pop));
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


   setInterval(function(){
   if (document.getElementById("popup-container").style.display === "none"){
   updateWeather();


   }


   },5000);
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

