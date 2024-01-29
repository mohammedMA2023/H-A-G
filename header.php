<?php

		session_start();
		if ((isset($_SESSION["status"])) && ($_SESSION["status"] != "loggedIn")){
      
			header("location:index.php");
			exit();
        
     
  }

  echo '<script type="module" src="js/scripts.js"></script>';



	echo '<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
  <!-- Navbar Brand--> 
  <a class="navbar-brand ps-3" href="index.html">Start Bootstrap</a> 
  <!-- Sidebar Toggle--> 
  <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button> 
  <!-- Navbar Search-->
   <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
    <div class="input-group">
     <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" /> 
     <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
      </div> 
      </form> 
      <!-- Navbar--> 
      <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
       <li class="nav-item dropdown">
       <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
       <i class="fas fa-user fa-fw"></i>
       </a> 
       <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="#!">Settings</a></li> 
        <li><a class="dropdown-item" href="#!">Activity Log</a></li> 
        <li><hr class="dropdown-divider" /></li>
        <li><button onclick="showLogin()" class="dropdown-item">Logout</button></li> 
        </ul>
         </li> 
         </ul> 
         </nav>';

         
     echo <<<EOT
            <div id="loginCon" class="container">
            <div class="row justify-content-center align-items-center vh-100">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Welcome to the Chat Room</h3>
                        </div>
                        <div class="card-body">
                            <form class="form" id="form" name="form" action="login.php" method="post">
                                <input type="hidden" id="auth" name="auth" value="login">
                                <div id="username" style="display:none;" class="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" class="form-control" id="username" name="uname">
                                </div>
                                <div class="form-group">
                                    <label for="userid">Email</label>
                                    <input name="userid" type="email" class="form-control" id="userid" required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input name="password" type="password" class="form-control" id="password" required>
                                </div>
                                <button type="submit" name="sub" id="sub" class="btn btn-success btn-lg btn-block">Log In</button>
                                <button id="login-reg" name="login-reg" type="button" class="btn btn-secondary btn-lg btn-block mt-3" onclick="changeUi()">Don't have an account? Register...</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
       EOT;

    
?>