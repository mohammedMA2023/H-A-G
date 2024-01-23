<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Weather Dashboard</title>
   <!-- Include Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
   <!-- Include Chart.js -->
   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   <style>
       body {
           font-family: 'Arial', sans-serif;
           background: linear-gradient(to right, #f2f8fd, #bac8e0);
           margin: 0;
           padding: 0;
           min-height: 100vh;
           display: flex;
           justify-content: center;
           align-items: center;
       }


.popup-container {
   background: #fff;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   padding: 20px;
   border-radius: 10px;
   text-align: center;
   height:auto;
   width: 20%; /* Adjust the width as needed */
   margin: auto;
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 999; /* Ensure the popup is on top */
}




       label {
           display: block;
           margin-bottom: 5px;
           color: #333;
       }


       input {
           width: 100%;
           padding: 8px;
           margin-bottom: 10px;
           box-sizing: border-box;
           border: 1px solid #ccc;
           border-radius: 5px;
       }


       button {
           background: #007BFF;
           color: #fff;
           padding: 10px 20px;
           border: none;
           border-radius: 5px;
           cursor: pointer;
       }


       .dashboard {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 20px;
           justify-content: space-around;
           padding: 20px;
           background-color: rgba(255, 255, 255, 0.9);
           border-radius: 15px;
           box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
       }


       .card {
           border: none;
           border-radius: 10px;
           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
           padding: 20px;
           margin: 10px;
           text-align: center;
           background-color: white;
       }


       h2 {
           color: #333;
           font-size: 28px;
       }


       .data {
           font-size: 64px;
           font-weight: bold;
           margin-top: 10px;
       }


       .air-quality {
           color: #007BFF;
       }


       .weather {
           color: #28A745;
       }


       .pollen {
           color: #FFC107;
       }


       .rain-forecast {
           color: #FF073A;
       }


       .additional-info {
           margin-top: 20px;
           font-size: 18px;
           color: #6C757D;
       }
   </style>
</head>
<body>
   <div id="popup-container" class="popup-container border">
       <h2>Enter Location</h2>
       <p>Example: City, Country</p>


       <div class="input-group">
           <label for="locationInput">Location:</label>
           <input type="text" id="locationInput" placeholder="E.g., New York, USA">
       </div>


       <button  class="border" onclick="closeModel()">Get Coordinates</button>
   </div>
   <div class="container">
       <div class="dashboard">
           <div class="card">
               <h2 class="text-primary">Air Quality</h2>
               <div class="data air-quality" id="airQualityData">12</div>
               <canvas id="airQualityChart" width="200" height="100"></canvas>
               <div class="additional-info text-muted" id="airQualityInfo">
                   <p>AQI: 50 (Good)</p>
                   <p>Last Updated: 2024-01-22 12:30 PM</p>
               </div>
           </div>


           <div class="card">
               <h2 class="text-success">Weather</h2>
               <div class="data weather" id="weatherData">...</div>
               <canvas id="weatherChart" width="200" height="100"></canvas>
               <div class="additional-info text-muted" id="weatherInfo">
                   <p>Humidity: 60%</p>
                   <p>Wind Speed: 10 km/h</p>
                   <p>Last Updated: 2024-01-22 12:30 PM</p>
               </div>
           </div>


           <div class="card">
               <h2 class="text-warning">Pollen Levels</h2>
               <div class="data pollen" id="pollenData">High</div>
               <canvas id="pollenChart" width="200" height="100"></canvas>
               <div class="additional-info text-muted" id="pollenInfo">
                   <p>Last Updated: 2024-01-22 12:30 PM</p>
               </div>
           </div>


           <div class="card">
               <h2 class="text-danger">Rain Forecast</h2>
               <div class="data rain-forecast" id="rainForecastData">60%</div>
               <canvas id="rainForecastChart" width="200" height="100"></canvas>
               <div class="additional-info text-muted" id="rainForecastInfo">
                   <p>Last Updated: 2024-01-22 12:30 PM</p>
               </div>
           </div>
       </div>
   </div>


   <!-- Include Bootstrap JS and Popper.js -->
   <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>


   <script>
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


   // Sample data for charts
   var airQualityData = [10, 15, 20, 18, 12, 14, 16];
   var weatherData = [25, 24, 26, 23, 25, 27, 24];
   var pollenData = [3, 5, 8, 10, 6, 7, 4];
   var rainForecastData = [60, 40, 20, 30, 50, 70, 60];


   // Create air quality chart
   var airQualityChart = new Chart(document.getElementById('airQualityChart'), {
       type: 'line',
       data: {
           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
           datasets: [{
               label: 'PM2.5',
               data: airQualityData,
               borderColor: '#007BFF',
               fill: false
           }]
       },
       options: {
           responsive: true
       }
   });


   // Create weather chart
   var weatherChart = new Chart(document.getElementById('weatherChart'), {
       type: 'line',
       data: {
           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
           datasets: [{
               label: 'Temperature',
               data: weatherData,
               borderColor: '#28A745',
               fill: false
           }]
       },
       options: {
           responsive: true
       }
   });


   // Create pollen chart
   var pollenChart = new Chart(document.getElementById('pollenChart'), {
       type: 'line',
       data: {
           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
           datasets: [{
               label: 'Pollen',
               data: pollenData,
               borderColor: '#FFC107',
               fill: false
           }]
       },
       options: {
           responsive: true
       }
   });


   // Create rain forecast chart
   var rainForecastChart = new Chart(document.getElementById('rainForecastChart'), {
       type: 'line',
       data: {
           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
           datasets: [{
               label: 'Rain Forecast',
               data: rainForecastData,
               borderColor: '#FF073A',
               fill: false
           }]
       },
       options: {
           responsive: true
       }
   });


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
</script>
</body>
</html>

