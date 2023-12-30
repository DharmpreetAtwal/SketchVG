<?php
  $user  = 'root';
  $pass = '';
  $db = 'drawingdb';
  $db = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect");
  
  $name = $_POST['name'];
  $sql = "SELECT *  FROM saved WHERE name LIKE '$name';";
  $result = $db->query($sql);

  if($result) {
    $num_rows = $result->num_rows;
    if($num_rows == 1) {
        $first = $result->fetch_assoc();
        $drawing = $first['drawing'];
        $response = array(
            'status' => 'success',
            'message' => 'Hello from PHP!',
            'value' => $drawing
        );
    }
  }

  header('Content-Type: application/json');
  echo json_encode($response);
?>