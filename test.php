<?php
echo json_encode([
    'status' => 'success',
    'message' => 'PHP is working correctly',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION
]);
?>