/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    //
// Scripts
//
/*
function getHistoricalWeather() {
    var apiKey = 'YOUR_WEATHERBIT_API_KEY';
    var city = 'london';
    var startDate = '2024-01-22'; // Specify the start date in YYYY-MM-DD format
    var endDate = '2024-01-22';   // Specify the end date in YYYY-MM-DD format

    var weatherEndpoint = `https://api.weatherbit.io/v2.0/history/daily?city=${city}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`;

    fetch(weatherEndpoint)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                // Extract and use historical weather data as needed
                alert(JSON.stringify(data));
                console.log(data.data);
            } else {
                console.log('No historical weather data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching historical weather data:', error);
        });
}

getHistoricalWeather();
*/
const url = "https://api.open-meteo.com/v1/forecast";
const params = new URLSearchParams({
    latitude: 52.52,
    longitude: 13.41,
    hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m",
    start: "today",
    end: "now"
});
fetch(`${url}?${params}`)
    .then(response => response.json())
    .then(data => {
        const temps = data.hourly.temperature_2m;
        const times = data.hourly.time;
        const hourTemps = {};
        for (let i = 0; i < temps.length; i++) {
            const hour = new Date(times[i]).getHours();
            if (hour in hourTemps) {
                hourTemps[hour].push(temps[i]);
            } else {
                hourTemps[hour] = [temps[i]];
            }
        }
        const avgTemps = Object.entries(hourTemps).map(([hour, temps]) => {
            const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
            return `${hour}:00: ${avgTemp.toFixed(1)}°C`;
        });
        alert(avgTemps);
        alert(`Hourly temperatures from the start of today to now:\n${avgTemps.join("\n")}`);
    });

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


   function closeModel(){
       document.getElementById("popup-container").style.display = "none";
       getCoordinates();
       updateWeather();


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
