<?php
// server.php
//header('Access-Control-Allow-Origin: http://localhost:3000');


// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set the content type to JSON
header('Content-Type: application/json');

// Sample response data
$response = [
    'status' => 'success',
    'message' => 'Server is running'
];

// Output the response in JSON format
echo json_encode($response);
?>