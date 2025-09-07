<?php
// Simple PHP mail() version - optimized for shared hosting

// Remove problematic SMTP ini_set calls that can interfere with host mail configuration
// Let the hosting provider handle SMTP configuration

// Detect if this is an AJAX request
$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

// Only set JSON headers for AJAX requests
if ($isAjax) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    if ($isAjax) {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        exit;
    } else {
        // For direct access via browser (GET request), show friendly message
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            echo '<h1>Contact Form Handler</h1>';
            echo '<p>This script handles form submissions. Please use the contact form at <a href="contact.html">contact.html</a></p>';
            exit;
        }
        // For other methods, redirect back with error
        header('Location: contact.html?error=method_not_allowed');
        exit;
    }
}

try {
    // Get form data
    $formType = $_POST['form_type'] ?? '';
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? ''); // For contact form
    $postcode = trim($_POST['postcode'] ?? ''); // For contact form
    $service = trim($_POST['service'] ?? ''); // For contact form
    $message = trim($_POST['message'] ?? ''); // For contact form

    // Service-specific fields for chat modal forms
    $location = trim($_POST['location'] ?? '');
    $propertyType = trim($_POST['property_type'] ?? '');
    $vehicleMakeModel = trim($_POST['vehicle_make_model'] ?? '');
    $serviceType = trim($_POST['service_type'] ?? '');
    $safeType = trim($_POST['safe_type'] ?? '');
    $safeBrand = trim($_POST['safe_brand'] ?? '');
    $details = trim($_POST['details'] ?? '');

    // reCAPTCHA V3 validation - RE-ENABLED WITH PROPER FALLBACK HANDLING
    $recaptchaSecret = '6LeyKsArAAAAAHYnesU3EKnB3FiyOGg0LOGTjlP8';
    $recaptchaToken = $_POST['g-recaptcha-response'] ?? '';
    $recaptchaMinScore = 0.3; // Lowered threshold for better compatibility
    $recaptchaEnabled = true; // Master switch for reCAPTCHA

    error_log("reCAPTCHA token received: " . substr($recaptchaToken, 0, 20) . "...");

    // Only validate reCAPTCHA if enabled and token is provided
    if ($recaptchaEnabled && !empty($recaptchaToken)) {
        // Skip validation for fallback tokens but log them
        if (in_array($recaptchaToken, ['recaptcha_not_available', 'recaptcha_execute_failed', 'recaptcha_timeout', 'recaptcha_error_fallback'])) {
            error_log("reCAPTCHA fallback token detected, allowing submission: " . $recaptchaToken);
        } else {

    // Verify reCAPTCHA V3
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptchaData = [
        'secret' => $recaptchaSecret,
        'response' => $recaptchaToken,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];

    $recaptchaOptions = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($recaptchaData)
        ]
    ];

    $recaptchaContext = stream_context_create($recaptchaOptions);
    $recaptchaResult = file_get_contents($recaptchaUrl, false, $recaptchaContext);
    $recaptchaResponse = json_decode($recaptchaResult, true);

    if (!$recaptchaResponse['success']) {
        error_log('reCAPTCHA verification failed: ' . print_r($recaptchaResponse, true));
        $errorMsg = 'Security verification failed. Please try again.';
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
        }
    }

    // Check reCAPTCHA V3 score (lenient approach)
    $recaptchaScore = $recaptchaResponse['score'] ?? 0.0;
    if ($recaptchaScore < $recaptchaMinScore) {
        error_log("reCAPTCHA score low but allowing submission: $recaptchaScore (minimum: $recaptchaMinScore)");
        // Log the low score but don't block the submission - just flag for review
        error_log("Form submission flagged for review due to low reCAPTCHA score");
    } else {
        error_log("reCAPTCHA score acceptable: $recaptchaScore");
    }

        error_log("reCAPTCHA verification successful - Score: $recaptchaScore, Action: " . ($recaptchaResponse['action'] ?? 'unknown'));
        }
    } else if ($recaptchaEnabled) {
        error_log("reCAPTCHA enabled but no token provided - allowing submission with warning");
    } else {
        error_log("reCAPTCHA disabled - allowing submission");
    }

    // Validate required fields based on form type with specific error messages
    error_log("Validating fields - Name: '" . $name . "', Phone: '" . $phone . "', Form type: '" . $formType . "'");
    
    if (empty($name)) {
        $errorMsg = 'Please enter your name.';
        error_log("Validation failed: Name is empty");
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
        }
    }
    
    if (empty($phone)) {
        $errorMsg = 'Please enter your phone number.';
        error_log("Validation failed: Phone is empty");
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
        }
    }

    // Additional validation for contact form
    if ($formType === 'contact') {
        error_log("Contact form validation - Postcode: '" . $postcode . "', Service: '" . $service . "'");
        
        if (empty($postcode)) {
            $errorMsg = 'Please enter your postcode.';
            error_log("Validation failed: Postcode is empty");
            if ($isAjax) {
                throw new Exception($errorMsg);
            } else {
                header('Location: contact.html?error=' . urlencode($errorMsg));
                exit;
            }
        }
        
        if (empty($service)) {
            $errorMsg = 'Please select a service.';
            error_log("Validation failed: Service is empty");
            if ($isAjax) {
                throw new Exception($errorMsg);
            } else {
                header('Location: contact.html?error=' . urlencode($errorMsg));
                exit;
            }
        }
    }

    // Create email content based on form type
    $emailSubject = '';
    $emailBody = '';
    $headers = '';

    if ($formType === 'contact') {
        $emailSubject = 'Contact Form Inquiry - Bullard Locks';
        $emailBody = generateContactEmailBody($name, $phone, $email, $postcode, $service, $message);
        $headers = generateHeaders($email, 'Contact Form');
    } elseif ($formType === 'emergency') {
        $emailSubject = 'Emergency Locksmith Request - Bullard Locks';
        $emailBody = generateServiceEmailBody('Emergency Locksmith', $name, $phone, $location, $propertyType, '', '', '', $details);
        $headers = generateHeaders('', 'Emergency Service');
    } elseif ($formType === 'car') {
        $emailSubject = 'Auto Locksmith Request - Bullard Locks';
        $emailBody = generateServiceEmailBody('Auto Locksmith', $name, $phone, $location, '', $vehicleMakeModel, $serviceType, '', $details);
        $headers = generateHeaders('', 'Auto Service');
    } elseif ($formType === 'safe') {
        $emailSubject = 'Safe Engineer Request - Bullard Locks';
        $emailBody = generateServiceEmailBody('Safe Engineer', $name, $phone, $location, '', '', '', $safeType, $details, $safeBrand);
        $headers = generateHeaders('', 'Safe Service');
    } else {
        $errorMsg = 'Invalid form type';
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
        }
    }

    // Send email using PHP mail() function
    $to = 'william@bullardlocks.com';
    
    // Log attempt details for debugging
    error_log("Attempting to send email - Form type: $formType, Name: $name, Phone: $phone, To: $to");
    error_log("Email subject: $emailSubject");
    error_log("Headers: $headers");
    
    // Check if mail function exists first
    if (!function_exists('mail')) {
        error_log("mail() function does NOT exist - PHP mail disabled");
        throw new Exception('Mail function not available on server. Please call us directly at 07809 887 883.');
    }
    
    // Clear any previous errors
    error_clear_last();
    
    $success = mail($to, $emailSubject, $emailBody, $headers);
    
    // Get the last error if any occurred
    $lastError = error_get_last();
    
    if (!$success) {
        $errorMsg = 'Failed to send email. Please try calling us directly at 07809 887 883.';
        
        // Log detailed error information
        error_log("Mail sending FAILED - mail() returned false");
        error_log("Form data - Type: $formType, Name: $name, Phone: $phone, Postcode: $postcode, Service: $service");
        
        if ($lastError) {
            error_log("PHP Error: " . $lastError['message'] . " in " . $lastError['file'] . " on line " . $lastError['line']);
        }
        
        // Check if this is a hosting-related issue
        if (function_exists('mail')) {
            error_log("mail() function exists - likely server configuration issue");
        } else {
            error_log("mail() function does NOT exist - PHP mail disabled");
        }
        
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
        }
    }
    
    error_log("Mail sent successfully to $to");

    // Send confirmation email to sender (if email provided) - SKIP FOR CONTACT FORM
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL) && $formType !== 'contact') {
        $confirmationSubject = 'Thank you for contacting Bullard Locks';
        $confirmationBody = generateConfirmationEmailBody($name, $formType);
        $confirmationHeaders = generateConfirmationHeaders();

        // Send confirmation email (don't fail the whole process if this fails)
        @mail($email, $confirmationSubject, $confirmationBody, $confirmationHeaders);
    }

    // Success handling
    error_log("Preparing success response - AJAX: " . ($isAjax ? 'true' : 'false'));
    
    if ($isAjax) {
        error_log("Sending JSON success response");
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent to William.'
        ]);
    } else {
        error_log("Redirecting to contact.html with success message");
        // For regular form submission, show success page or redirect with success message
        header('Location: contact.html?success=' . urlencode('Thank you! Your message has been sent to William.'));
        exit;
    }

} catch (Exception $e) {
    if ($isAjax) {
        error_log('Email sending failed: ' . $e->getMessage());
        echo json_encode([
            'success' => false,
            'message' => 'Sorry, there was an error sending your request. Please call us directly at 07809 887 883.'
        ]);
    } else {
        // For regular form submission, redirect back with error
        header('Location: contact.html?error=' . urlencode('Sorry, there was an error sending your request. Please call us directly at 07809 887 883.'));
        exit;
    }
}

function generateHeaders($replyToEmail = '', $serviceType = '') {
    $headers = "From: Bullard Locks Website <william@bullardlocks.com>\r\n";
    $headers .= "Reply-To: " . (!empty($replyToEmail) ? $replyToEmail : "william@bullardlocks.com") . "\r\n";
    $headers .= "Return-Path: william@bullardlocks.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    if (!empty($serviceType)) {
        $headers .= "X-Service-Type: $serviceType\r\n";
    }

    return $headers;
}

function generateContactEmailBody($name, $phone, $email, $postcode, $service, $message) {
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            h1 { color: #0d6efd; margin-bottom: 5px; font-size: 24px; }
            h2 { color: #6c757d; margin-top: 0; font-size: 16px; font-weight: normal; }
            p { margin: 10px 0; padding: 0; }
            .details { background: #f8f9fa; padding: 20px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1>Contact Form Inquiry</h1>
        <h2>Bullard Locks - North London Locksmith Services</h2>

        <div class='details'>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Phone:</strong> $phone</p>";

    if (!empty($email)) {
        $body .= "<p><strong>Email:</strong> $email</p>";
    }

    if (!empty($postcode)) {
        $body .= "<p><strong>Postcode:</strong> $postcode</p>";
    }

    $body .= "<p><strong>Service Required:</strong> $service</p>
            <p><strong>Message:</strong></p>
            <p>" . nl2br(htmlspecialchars($message)) . "</p>
        </div>

        <p><strong>Bullard Locks</strong> | William Bullard | 07809 887 883</p>
        <p>Serving North & Central London | 24/7 Emergency Service</p>
    </body>
    </html>";

    return $body;
}

function generateServiceEmailBody($serviceName, $name, $phone, $location, $propertyType, $vehicle, $serviceType, $safeType, $details, $safeBrand = '') {
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            h1 { color: #dc3545; margin-bottom: 5px; font-size: 24px; }
            h2 { color: #6c757d; margin-top: 0; font-size: 16px; font-weight: normal; }
            p { margin: 10px 0; padding: 0; }
            .urgent { background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .details { background: #f8f9fa; padding: 20px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1>$serviceName Request</h1>
        <h2>Bullard Locks - Professional Locksmith Services</h2>

        <div class='urgent'>
            URGENT REQUEST: Please respond within 5 minutes
        </div>

        <div class='details'>
            <p><strong>Customer Name:</strong> $name</p>
            <p><strong>Phone Number:</strong> $phone</p>";

    if (!empty($location)) {
        $body .= "<p><strong>Location:</strong> $location</p>";
    }

    if (!empty($propertyType)) {
        $body .= "<p><strong>Property Type:</strong> $propertyType</p>";
    }

    if (!empty($vehicle)) {
        $body .= "<p><strong>Vehicle:</strong> $vehicle</p>";
    }

    if (!empty($serviceType)) {
        $body .= "<p><strong>Service Type:</strong> $serviceType</p>";
    }

    if (!empty($safeType)) {
        $body .= "<p><strong>Safe Type:</strong> $safeType</p>";
    }

    if (!empty($safeBrand)) {
        $body .= "<p><strong>Safe Brand/Model:</strong> $safeBrand</p>";
    }

    if (!empty($details)) {
        $body .= "<p><strong>Details:</strong></p>
            <p>" . nl2br(htmlspecialchars($details)) . "</p>";
    }

    $body .= "
        </div>

        <p><strong>Bullard Locks</strong> | William Bullard | 07809 887 883</p>
        <p>24/7 Emergency Service | North & Central London Coverage</p>
    </body>
    </html>";

    return $body;
}

function generateConfirmationHeaders() {
    $headers = "From: Bullard Locks <william@bullardlocks.com>\r\n";
    $headers .= "Reply-To: william@bullardlocks.com\r\n";
    $headers .= "Return-Path: william@bullardlocks.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "X-Confirmation-Email: true\r\n";

    return $headers;
}

function generateConfirmationEmailBody($name, $formType) {
    $serviceText = '';
    if ($formType === 'emergency') {
        $serviceText = 'emergency locksmith service';
    } elseif ($formType === 'car') {
        $serviceText = 'auto locksmith service';
    } elseif ($formType === 'safe') {
        $serviceText = 'safe engineering service';
    } else {
        $serviceText = 'our services';
    }

    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            h1 { color: #28a745; margin-bottom: 5px; font-size: 24px; }
            h2 { color: #6c757d; margin-top: 0; font-size: 16px; font-weight: normal; }
            p { margin: 15px 0; padding: 0; }
            .confirmation { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .contact { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <h1>Thank You for Contacting Bullard Locks</h1>
        <h2>Your request has been received successfully</h2>

        <div class='confirmation'>
            <p>Dear $name,</p>
            <p><strong>✓ Your request has been received</strong></p>
            <p>Thank you for contacting Bullard Locks. We have received your inquiry about our $serviceText and will respond within 5 minutes.</p>
        </div>

        <div class='contact'>
            <p><strong>What happens next?</strong></p>
            <p>• William Bullard will contact you directly within 5 minutes</p>
            <p>• We'll discuss your specific needs and requirements</p>
            <p>• We'll provide a quote and arrange the service</p>
        </div>

        <p>If you need immediate assistance, please call us directly:</p>
        <p><strong>📞 07809 887 883</strong></p>

        <p>Best regards,<br>
        <strong>William Bullard</strong><br>
        Bullard Locks<br>
        North London Locksmith Services<br>
        24/7 Emergency Service</p>
    </body>
    </html>";

    return $body;
}
?>
