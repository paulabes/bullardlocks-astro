<?php
// Simple connection test endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = [
    'success' => true,
    'message' => 'Server connection OK',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION,
    'mail_function_available' => function_exists('mail'),
    'post_max_size' => ini_get('post_max_size'),
    'upload_max_filesize' => ini_get('upload_max_filesize')
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>