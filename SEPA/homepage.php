
<html>
<head>
<style>
p {
	font-family: "Arial Black", Gadget, sans-serif;
    color: black;
}
h {
	font-family: "Arial Black", Gadget, sans-serif;
    color: black;
}

.navi{
  background-color:green;
  top:0;
  position:fixed;
  width:100%;
}
ul1 {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-left:10px;
  background-color:black;
}

li1 a{
  font-family: "Candara";
  display: inline-block;
  padding: 18px 20px;
  text-decoration: none;
  color: white;
  font-size:18px;
}
li1 a:hover {
  color: black;
  background-color:white;
}
li3 {
float:left;
}

.container {
  position: static;
  content: "";
  display: table;
  clear: both;
}
.one{
float:right;
width:50%;
margin-top:400px;

}

.container .btn {
  top: 350px;
  left:300px;
  position: static;
  background-color:#e50239;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border-style:none;
  border-radius: 5px;
  text-align: center;
  margin-left:150px;
}


.row:after {
  content: "";
  display: table;
  clear: both;
}

p4 {
  color:#616161;
 font-family: "Candara";
}

input[type=text], select {
  font-family: "Arial Black", Gadget, sans-serif;
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

input[type=submit] {
  font-family: "Arial Black", Gadget, sans-serif;
  
  width: 200px;
  background-color: black;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

footer {
	position: fixed;
	width: 100%;
	left: 0;
	bottom: 0;
	background-color: green;
	color: white;
	text-align: center;
}


</style>
</head>

<body>

<div class="navi">
<ul1>
  <li3><a href="homepage.php"><input type="image" src="huachang_logo.png"></a></li3>


  
<div class="track" style="margin-top:60px;">
  <form action="track.php" method="POST">
  <input type="text" name="parcel_id" placeholder="Enter tracking ID">
  
  <input type="submit" value="Track">
  </form>


<?php

if(isset($_POST['status_id'])){
$status_id=$_POST['status_id'];
//connect to database
$db = mysqli_connect('localhost', 'root', '', 'login');
//select data using status_id and name
$query= "SELECT * FROM request, account WHERE Pack_ID='$status_id' AND request.Name = account.Name";
$result=mysqli_query($db, $query);
if(mysqli_num_rows($result)==0) {
  echo "<p>Status ID are invalid.</p>";
}
//display data in table form
else {
  echo "<p align=center>Information:</p>";
  echo "<table>";
  echo "<tr bgcolor=#e50239><th><b>Status ID</b></th><th><b>Applicant Name</b></th><th><b>Applicant Phone</b></th><th><b>Destination</b></th><th><b>Date</b></th></tr>";
  while($row=mysqli_fetch_array($result)) {
    echo "<tr><td>".$row['Pack_ID']."</td><td>".$row['Name']."</td><td>".$row['Phone']."</td><td>".$row['Destination_Address']."</td><td>".$row['Date']."</td></tr>";}
}
echo "</table><br>";


}
?>

</div>

</ul1>
</div> 

 
<div class="container">
 <div class="one"><p style="color:#e50239;margin-left:311px;font-size:38px;">
 
 <p style="margin-left:11px;">Hi Welcome!
<p style="margin-left:11px;"> Please click the below button to submit for an Interview!


 <a style="text-decoration:none" href="form.php"><button class="btn"><b>Apply Now</b></button></a></div>
 <div class="two">

<footer>
   
	<p>Kar Hern</p>

</footer>
</body>
