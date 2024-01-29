<?php
session_start();
    $header = "";
    // Logging code
    // Get the type of request (GET or POST).
    date_default_timezone_set("Europe/London");
    function assessPasswordSecurity($password) {
        // Check if the password contains at least 8 characters
        if (strlen($password) < 8) {
            return "Password must be at least 8 characters long.";
        }
    
        // Check if the password contains at least one uppercase letter
        if (!preg_match('/[A-Z]/', $password)) {
            return "Password must contain at least one uppercase letter.";
        }
    
        // Check if the password contains at least one lowercase letter
        if (!preg_match('/[a-z]/', $password)) {
            return "Password must contain at least one lowercase letter.";
        }
    
        // Check if the password contains at least one digit
        if (!preg_match('/[0-9]/', $password)) {
            return "Password must contain at least one digit.";
        }
        // Check if the password contains at least one special character
        if (!preg_match('/[^a-zA-Z0-9]/', $password)) {
            return "Password must contain at least one special character.";
        }
    
        // Password is secure
        return null;
    }
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbName = "login_db";
    $dbTable = "users";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbName);
    if ($conn->connect_error) {;
            die();
    }
    
    $uPass = $_POST["password"];
// Hash the entered password
    $hashedPassword = password_hash($uPass, PASSWORD_BCRYPT);
    switch ($_POST['auth']){
        case "login":
            $uName = $_POST["userid"];
            // Use prepared statement to query the database
    $stmt = $conn->prepare("SELECT * FROM $dbTable WHERE email = ?");
    $stmt->bind_param("s", $uName);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $storedHashedPassword = $row["password"];

            // Verify the entered password against the stored hashed password
            if ((password_verify($uPass, $storedHashedPassword)) && ($uName == $row["email"]) ) {
                $status = "loggedIn";
                $header = "home.php";
                $newUserID = $row["user_id"];

                if (!isset($_SESSION["userid"])){
                    $_SESSION["userid"] = json_encode(array($newUserID,$row["username"]));
                    echo $_SESSION["userid"];
                }

} else {
                $status = "loggedOut";
                $_SESSION['error'] = "Error: these details are incorrect. Please try again.";
                $header = "index.php";
			}
    }
    } else {
        $status = "loggedOut";
        $_SESSION['error'] = "Error: these details are incorrect. Please try again.";
        $header = "index.php";
	}
    break;
    case "reg":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $password = $_POST["password"];
            
            // Assess password security
            $securityError = assessPasswordSecurity($password);
            if ($securityError !== null) {
                // Password is not secure, set session variable and redirect
                $_SESSION['error'] = $securityError;
                $header = "index.php";
            }
             // Password is secure, you can continue with registration or other actions.
            else{
        $email = $_POST["userid"];
        $password = $_POST["password"];
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        
        // Check if the email already exists in the database
        $stmt = $conn->prepare("SELECT email FROM $dbTable WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
            if ($result->num_rows > 0){
            // Email already exists, handle this case as needed
            $_SESSION['error'] = "Error: this email is already registered. Please try again.";
                $header = "index.php";
         } else {
                // Email and password don't exist, proceed to insert the new user
                // Hash the password
                // Insert the new user into the database
                $stmt = $conn->prepare("INSERT INTO $dbTable (username,email,password) VALUES (?, ?,?)");
                $u = $_POST["uname"];
                $stmt->bind_param("sss",$u ,$email, $hashedPassword);
                 $stmt->execute();
                    $status = "loggedIn";
                    $header = "home.php";
                     $newUserId = mysqli_insert_id($conn);

                    $_SESSION["userid"] = json_encode(array($newUserId,$u));
            }
        }       
            }           
    break;
case "logout":
    session_destroy();
$header = "index.php";
break;
    }
$_SESSION["status"] = $status;
$conn->close();
header("location:".$header);
exit();
?>