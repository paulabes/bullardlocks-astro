<?php
// Test PHP mail() function - no external libraries needed!

echo "<h1>PHP Mail Test</h1>";

// Test basic PHP mail function
$testEmail = "paulabrahams@outlook.com";
$testSubject = "Test Email from Bullard Locks Website";
$testMessage = "This is a test email to verify PHP mail() function is working.\n\nSent at: " . date('Y-m-d H:i:s');
$testHeaders = "From: Bullard Locks Test <noreply@bullardlocks.com>\r\n";
$testHeaders .= "Reply-To: noreply@bullardlocks.com\r\n";
$testHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";

echo "<p>Testing PHP mail() function...</p>";
echo "<p>PHP Version: " . phpversion() . "</p>";

// Check if mail function exists
if (function_exists('mail')) {
    echo "<p style='color: green;'>✓ PHP mail() function is available</p>";

    // Optional: Send a test email (uncomment to test)
    /*
    $mailSent = mail($testEmail, $testSubject, $testMessage, $testHeaders);
    if ($mailSent) {
        echo "<p style='color: green;'>✓ Test email sent successfully!</p>";
        echo "<p style='color: blue;'>Check your inbox at $testEmail</p>";
    } else {
        echo "<p style='color: red;'>✗ Failed to send test email</p>";
        echo "<p style='color: orange;'>This might be normal - some servers block mail() for security</p>";
    }
    */

    echo "<p style='color: green;'>✓ PHP mail() is ready to use!</p>";
    echo "<p>You can now use send_email.php without needing PHPMailer</p>";

} else {
    echo "<p style='color: red;'>✗ PHP mail() function is not available</p>";
    echo "<p>You may need to contact your hosting provider</p>";
}

// Show PHP mail configuration
echo "<h2>PHP Mail Configuration:</h2>";
echo "<pre>";
echo "sendmail_path: " . ini_get('sendmail_path') . "\n";
echo "SMTP: " . ini_get('SMTP') . "\n";
echo "smtp_port: " . ini_get('smtp_port') . "\n";
echo "</pre>";
?>
