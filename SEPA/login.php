<?php
session_start();

//If user click logout
if (isset($_POST['logout_button'])) {
    unset($_SESSION['user_id']);
    unset($_SESSION['username']);
    unset($_SESSION['email']);
    unset($_SESSION['first_name']);
    unset($_SESSION['last_name']);
    unset($_SESSION['user_role']);
    unset($_SESSION['has_login']);
}

//if user is already login, deny access to this login page, unless they logout
if(isset($_SESSION['has_login'])){
    if ($_SESSION['user_role']  == 'staff') {
        header('location:staff_list.php');
    } else if ($_SESSION['user_role']  == "hr") {
        header('location:hr_list.php');
    } 
}
    
//If user click login
if (isset($_POST['login_button'])) {


    $username = $_POST['username'];
    $password = $_POST['password'];

    include('db_connection.php');
    //verify account's information
    $query = "SELECT * FROM `users` WHERE username ='$username' AND password ='$password' ";
    $result = mysqli_query($db, $query);
    
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {

            $_SESSION['user_id'] = $row["user_id"];
            $_SESSION['username'] = $row["username"];
            $_SESSION['email'] = $row["email"];
            $_SESSION['first_name'] = $row["first_name"];
            $_SESSION['last_name'] = $row["last_name"];
            $_SESSION['user_role'] = $row["user_role"];
            $_SESSION['has_login'] = 1;

            //different role are directed to different page
            if ($row["user_role"] == 'staff') {
                header('location:staff_list.php');
            } else if ($row["user_role"] == "hr") {
                header('location:hr_list.php');
            } 
        }
    } else {
        $_SESSION['wrong_credential'] = 'Username or password is incorrect';

    }
}


?>

<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- <link rel="stylesheet" href = "css/bootstrap.css"/>
    <script src="js/bootstrap.js"></script> -->
    <title>Login</title>

    <style>
        :root {
            --input-padding-x: 1.5rem;
            --input-padding-y: .75rem;
        }

        body {
            background: #007bff;
            background: linear-gradient(to right, #0062E6, #33AEFF);
        }

        .card-signin {
            border: 0;
            border-radius: 1rem;
            box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
        }

        .card-signin .card-title {
            margin-bottom: 2rem;
            font-weight: 300;
            font-size: 1.5rem;
        }

        .card-signin .card-body {
            padding: 2rem;
        }

        .form-signin {
            width: 100%;
        }

        .form-signin .btn {
            font-size: 80%;
            border-radius: 5rem;
            letter-spacing: .1rem;
            font-weight: bold;
            padding: 1rem;
            transition: all 0.2s;
        }

        .form-label-group {
            position: relative;
            margin-bottom: 1rem;
        }

        .form-label-group input {
            height: auto;
            border-radius: 2rem;
        }

        .form-label-group>input,
        .form-label-group>label {
            padding: var(--input-padding-y) var(--input-padding-x);
        }

        .form-label-group>label {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            margin-bottom: 0;
            /* Override default `<label>` margin */
            line-height: 1.5;
            color: #495057;
            border: 1px solid transparent;
            border-radius: .25rem;
            transition: all .1s ease-in-out;
        }

        .form-label-group input::-webkit-input-placeholder {
            color: transparent;
        }

        .form-label-group input:-ms-input-placeholder {
            color: transparent;
        }

        .form-label-group input::-ms-input-placeholder {
            color: transparent;
        }

        .form-label-group input::-moz-placeholder {
            color: transparent;
        }

        .form-label-group input::placeholder {
            color: transparent;
        }

        .form-label-group input:not(:placeholder-shown) {
            padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
            padding-bottom: calc(var(--input-padding-y) / 3);
        }

        .form-label-group input:not(:placeholder-shown)~label {
            padding-top: calc(var(--input-padding-y) / 3);
            padding-bottom: calc(var(--input-padding-y) / 3);
            font-size: 12px;
            color: #777;
        }

        /* Fallback for Edge
-------------------------------------------------- */

        @supports (-ms-ime-align: auto) {
            .form-label-group>label {
                display: none;
            }

            .form-label-group input::-ms-input-placeholder {
                color: #777;
            }
        }

        /* Fallback for IE
-------------------------------------------------- */

        @media all and (-ms-high-contrast: none),
        (-ms-high-contrast: active) {
            .form-label-group>label {
                display: none;
            }

            .form-label-group input:-ms-input-placeholder {
                color: #777;
            }
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Sign In</h5>
                        <form class="form-signin" action="./login.php" method="POST">

                            <!-- Show message after user registered an account-->
                            <?php if (isset($_SESSION['registered_message'])) { ?>
                                <div class="form-label-group">
                                    <div class="alert alert-success" role="alert"><?php echo $_SESSION['registered_message'];
                                                                                    unset($_SESSION['registered_message']) ?></div>
                                </div>
                            <!-- Show error message for wrong credential-->
                            <?php }elseif(isset($_SESSION['wrong_credential'])){ ?>
                                <div class="form-label-group">
                                    <div class="alert alert-danger" role="alert"><?php echo $_SESSION['wrong_credential'];
                                                                                    unset($_SESSION['wrong_credential']) ?></div>
                                </div>
                            <?php } ?>
                            <!-- Input for Username -->
                            <div class="form-label-group">
                                <input type="text" id="inputUsername" class="form-control" name = "username" placeholder="Username" required autofocus>
                                <label for="inputUsername">Username</label>
                            </div>
                            <!-- Input for Password -->
                            <div class="form-label-group">
                                <input type="password" id="inputPassword" class="form-control" name = "password" placeholder="Password" required>
                                <label for="inputPassword">Password</label>
                            </div>

                            <button class="btn btn-lg btn-primary btn-block text-uppercase" name="login_button" type="submit">Sign in</button>

                        </form>

                        <div class="text-center mt-5"><a href="./registration.php">Register an Account</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</body>

</html>