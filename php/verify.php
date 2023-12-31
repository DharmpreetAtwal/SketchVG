<?php
    $user  = 'root';
    $pass = '';
    $db = 'drawingdb';
    $db = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect");

    $name = $_POST['name'];

    $sql = "SELECT *  FROM saved WHERE name LIKE '$name';";
    $result = $db->query($sql);
    $num_rows = -1;

    if($result) {
        $num_rows = $result->num_rows;
    }

    if($num_rows == 0) {
        $response = array("status" => "success", "message" => "Writing new file");      
    } else {
        $response = array("status" => "overwrite", "message" => "Found existing file");
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>