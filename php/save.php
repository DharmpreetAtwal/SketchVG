<?php
  $user  = 'root';
  $pass = '';
  $db = 'drawingdb';

  $db = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect");
  
  $name = $_POST['name'];
  $drawing = $_POST['drawing'];

  echo "WORKING";
  
  $sql = "INSERT INTO saved (name, drawing) VALUES ('$name', '$drawing')";
  if($db->query($sql) == TRUE) {
    echo "SUCCESS";
  } else {
    echo "ERROR: " . $sql . "<br>";
  }
?>