<?php
  $user  = 'root';
  $pass = '';
  $db = 'drawingdb';
  $db = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect");
  
  $name = $_POST['name'];
  $drawing = $_POST['drawing'];

  $sql = "SELECT *  FROM saved WHERE name LIKE '$name';";
  $result = $db->query($sql);
  $num_rows = -1;

  if($result) {
    $num_rows = $result->num_rows;
  }
  
  
  if($num_rows == 0) {
    $sql = "INSERT INTO saved (name, drawing) VALUES ('$name', '$drawing')";
    if($db->query($sql) == TRUE) {
      $response = array("status" => "success", "message" => "Saved successful");
    } else {
      $response = array("status" => "errorsave", "code" => 1, "message" => "Save failed");
    }
  } else {
    $response = array("status" => "errorname", "code" => 2, "message" => "Name exists");
  }

  header('Content-Type: application/json');
  echo json_encode($response);
?>