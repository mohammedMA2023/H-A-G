<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Health Advice Group</title>
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <script type="module" src="js/scripts.js" defer></script>

</head>
<body class="sb-nav-fixed">
<?php
include "header.php";
?>

<div id="layoutSidenav">
    <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
                <div class="nav">
                    <br>
                    <a class="nav-link" href="index.php">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        Home Page
                    </a>
                    <div class="sb-sidenav-menu-heading"></div>
                    <div class="sb-nav-link-icon"></div>
                    <div class="sb-sidenav-collapse-arrow"></div>
                    <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="layout-static.html">Static Navigation</a>
                            <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                        </nav>
                    </div>
                    <div class="sb-nav-link-icon"></div>
                    <div class="sb-sidenav-collapse-arrow"></div>
                    <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            </div>
                            <div class="sb-sidenav-collapse-arrow"></div>
                            <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            </div>
                        </nav>
                    </div>
                    <div class="sb-sidenav-menu-heading"></div>
                    <div class="sb-nav-link-icon"></div>
                    <div class="sb-nav-link-icon"></div>
                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                Health Advice Group
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">
        <main>
            <div id="button-container">
                <br>
                <br>
                <div class="loc-button">
                                <h1 style="color:white;" class="mt-4">Health Advice Group</h1>

                                <button onclick="document.getElementById('popup-container').style.display = 'block'" class="border" style="width:20%;" id="showLocCon">Enter a new location...</button>

</div>
            </div>
            <div class="container-fluid px-4">
                <ol class="breadcrumb mb-4">
                </ol>
                <div id="popup-container" class="popup-container border">
                    <h2>Enter Location</h2>
                    <p>Example: City, Country</p>
                    <div class="input-group">
                        <label for="locationInput">Location:</label>
                        <input type="text" id="locationInput" placeholder="E.g., New York, USA">
                    </div>
                    <br>
                    <br>
                    <button id="close-model" class="border">Get Data</button>
                </div>
                <div id="spinner-container" class="spinner-container">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p class="loading-text">Fetching data...</p>
                </div>
                <div id="all-content" style="display:none;">
                    <div class="row">
                        <div class="dashboard">
                            <div class="card">
                                <h2 class="text-primary">Air Quality</h2>
                                <div class="data air-quality" id="airQualityData">12</div>
                                <div class="additional-info text-muted" id="airQualityInfo">
                                    <p id="aq-desc"></p>
                                </div>
                            </div>
                            <div class="card">
                                <h2 class="text-success">Weather</h2>
                                <div class="data weather" id="weatherData">...</div>
                                <div class="additional-info text-muted" id="weatherInfo">
                                    <p>Humidity: 60%</p>
                                    <p>Wind Speed: 10 km/h</p>
                                    <p>Last Updated: 2024-01-22 12:30 PM</p>
                                </div>
                            </div>
                            <div class="card">
                                <h2 class="text-warning">Pollen Levels (Alder)</h2>
                                <div class="data pollen" id="pollenData">...</div>
                                <div class="additional-info text-muted" id="pollenInfo">
                                </div>
                            </div>
                            <div class="card">
                                <h2 class="text-danger">Wind Speed</h2>
                                <div class="data rain-forecast" id="windSpeed">...</div>
                                <div class="additional-info text-muted" id="rainForecastInfo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-chart-area me-1"></i>
                                    Today's Weather Forecast
                                </div>
                                <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-chart-bar me-1"></i>
                                    Today's PM10 Air Quality Forecast
                                </div>
                                <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                            </div>
                        </div>
                    </div>
                    <div class="card" style="text-align:center;">
                        <button id="ShowTable" class="row">Generate Weather and AQ</button>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Forecasts in Major Cities
                        </div>
                        <div id="tableData">
                        <table id='datatablesSimple'>
    <thead>
            <tr>
                <th>Location</th>
                <th>Weather</th>
                <th>Air Quality (PM10)</th>
            </tr>
        </thead>
        <tbody id="t-bdy"></tbody>
</table>

                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; Health Advice Group 2024</div>
                    <div>
                        <a href="#">Privacy Policy</a>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous" async></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous" async defer></script>
<script type="module" src="assets/demo/chart-area-demo.js" async defer></script>
<script type="module" src="assets/demo/chart-bar-demo.js" async defer></script>
<script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous" async></script>
</body>
</html>