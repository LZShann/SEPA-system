<?php
session_start();

// server side to check the data inserted in registration page after user click on the 'register' button

//if user is already login, deny access to this registration page, unless they logout
if(isset($_SESSION['has_login'])){
    if ($_SESSION['user_role']  == 'staff') {
        header('location:staff_list.php');
    } else if ($_SESSION['user_role']  == "hr") {
        header('location:hr_list.php');
    } 
}

//check if user has clicked the 'register' button
if (isset($_POST['submit_button'])) {

    //if confirm password and passowrd does not match
    if ($_POST['confirm_password'] != $_POST['password']) {
        $_SESSION['error_message'] = 'Password does not match confirm password';
    } else {

        //registered account data
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);
        $email = trim($_POST['email']);
        $first_name = trim($_POST['first_name']);
        $last_name = trim($_POST['last_name']);

        //database connection
        include('db_connection.php');
        //Insert data into database
        $sql = "INSERT INTO users (username, password, email, first_name, last_name, user_role )
                VALUES ('$username', '$password', '$email', '$first_name', '$last_name', 'normal') ";

        $result = mysqli_query($db, $sql);

        $_SESSION['registered_message'] = 'Your account is registered';

        //Redirect back to login page after succesfully registered
        header('location:login.php');
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
    <title>Registration</title>

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
                        <h5 class="card-title text-center">Account Registration</h5>
                        <form class="form-signin" action="./registration.php" method="POST">

                            <!-- Input for first name -->
                            <?php if (isset($_SESSION['error_message'])) { ?>
                                <div class="form-label-group">
                                    <div class="alert alert-danger" role="alert"><?php echo $_SESSION['error_message'];
                                                                                    unset($_SESSION['error_message']) ?></div>
                                </div>
                            <?php } ?>

                            <!-- Input for first name -->
                            <div class="form-label-group">
                                <input type="text" id="inputFirstname" name="first_name" class="form-control" placeholder="First name" required>
                                <label for="inputFirstname">First name</label>
                            </div>

                            <!-- Input for first name -->
                            <div class="form-label-group">
                                <input type="text" id="inputLastname" name="last_name" class="form-control" placeholder="Last name" required>
                                <label for="inputLastname">Last name</label>
                            </div>

                            <!-- Input for Username -->
                            <div class="form-label-group">
                                <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username" required>
                                <label for="inputUsername">Username</label>
                            </div>

                            <!-- Input for Email Address -->
                            <div class="form-label-group">
                                <input type="email" id="inputEmail" name="email" class="form-control" placeholder="Email address" required>
                                <label for="inputEmail">Email address</label>
                            </div>

                            <!-- Input for Password-->
                            <div class="form-label-group">
                                <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
                                <label for="inputPassword">Password</label>
                            </div>
                            <!-- Input for Password-->
                            <div class="form-label-group">
                                <input type="password" id="inputConfirmassword" name="confirm_password" class="form-control" placeholder="Confirm Password" required>
                                <label for="inputConfirmassword">Confirm password</label>
                            </div>


                            <button name="submit_button" class="btn btn-lg btn-primary btn-block text-uppercase mt-5" type="submit">Register</button>

                        </form>
                        <div class="text-center mt-5"><a href="./login.php">Return to Login</a></div>

                    </div>
                </div>
            </div>
        </div>
    </div>


</body>

</html>