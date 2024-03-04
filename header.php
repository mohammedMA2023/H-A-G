<?php
session_start();
$auth_opt = "";
if ((!isset($_SESSION["status"])) || ($_SESSION["status"] != "loggedIn")){
    $auth_opt = '<li><button id="show-login" class="dropdown-item">Login/Register</button></li> 
    ';
    echo <<<EOT
            <div id="loginCon" class="popup-container border">

                            <h3>Health Advice Group</h3>


                            <form class="form" id="form" name="form" action="login.php" method="post">
                                <input type="hidden" id="auth" name="auth" value="login">
                                <div id="username" class="input-group" style="display:none;">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" name="uname">
                                </div>
                                <br>
                                <div class="input-group">
                                    <label for="userid">Email</label>
                                    <input name="userid" type="email" id="userid" required>
                                </div>
                                <br>
                                <div class="input-group">
                                    <label for="password">Password</label>
                                    <input name="password" type="password" id="password" required>
                                </div>
                                <br>
                                <div class="input-group" id="loc" style="display:none">
                                <label for="location">Allow us to use your location to display data?</label>
                                        
                                <input class="checkbox" id="location" type="checkbox" name="location" value="Allow us to use your location...">
                                
                                </div>
                                <br>
                                <button type="submit" name="sub" id="sub" class="btn btn-success btn-lg btn-block">Log In</button>
                                <button id="login-reg" name="login-reg" type="button" class="btn btn-secondary btn-lg btn-block mt-3" onclick="changeUi()">Don't have an account? Register...</button>
                            </form>
                        </div>
      EOT;
}
else{
    $auth_opt = '<form action="login.php" method="post"><input type="hidden" name="auth" id="auth" value="logout"><li><button class="dropdown-item">Logout</button></li> 
    </form>';
}
	echo '<section><nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
  <!-- Navbar Brand--> 
  
  <a class="navbar-brand ps-3" href="index.php"><br><img width=70 height=70 src="assets/img/HAG 2.png"/></a> 
  <!-- Sidebar Toggle--> 
  <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button> 
   
      <!-- Navbar--> 
      <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
       <li class="nav-item dropdown">
       <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
       <i class="fas fa-user fa-fw"></i>
       </a> 
       <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li><hr class="dropdown-divider" /></li> ' . $auth_opt . '
         
        </ul>
        </li> 
        </ul> 
        </nav>
        <br>
        <br>
        <br>
        <br>
        </section>';
?>