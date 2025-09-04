<?php
// Simple PHP mail() version - no PHPMailer required!

// SMTP Configuration for cPanel shared hosting
ini_set('SMTP', 'localhost'); // cPanel SMTP server
ini_set('smtp_port', '587'); // SMTP port for TLS
ini_set('sendmail_from', 'william@bullardlocks.com'); // From email address

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

<?php
// Simple PHP mail() version - no PHPMailer required!

// Detect if this is an AJAX request
$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    if ($isAjax) {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        exit;
    } else {
        // For regular form submission, redirect back with error
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

    // reCAPTCHA validation
    $recaptchaSecret = '6Lc0-70rAAAAAJhrJFqYK_E_MuCfL_lMztVPc6lL'; // Replace with your actual secret key
    $recaptchaToken = $_POST['g-recaptcha-response'] ?? '';

    if (empty($recaptchaToken)) {
        $errorMsg = 'Please complete the reCAPTCHA verification';
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
        }
    }

    // Verify reCAPTCHA
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
        $errorMsg = 'reCAPTCHA verification failed. Please try again.';
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
        }
    }

    // Validate required fields
    if (empty($name) || empty($phone)) {
        $errorMsg = 'Name and phone number are required';
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
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
    $success = mail($to, $emailSubject, $emailBody, $headers);

    if (!$success) {
        $errorMsg = 'Failed to send email';
        if ($isAjax) {
            throw new Exception($errorMsg);
        } else {
            header('Location: contact.html?error=' . urlencode($errorMsg));
            exit;
        }
    }

    // Success handling
    if ($isAjax) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your request has been sent successfully. William will contact you within 5 minutes.'
        ]);
    } else {
        // For regular form submission, show success page or redirect with success message
        header('Location: contact.html?success=' . urlencode('Thank you! Your request has been sent successfully. William will contact you within 5 minutes.'));
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
    $headers = "From: Bullard Locks Website <noreply@bullardlocks.com>\r\n";
    $headers .= "Reply-To: " . (!empty($replyToEmail) ? $replyToEmail : "noreply@bullardlocks.com") . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (!empty($serviceType)) {
        $headers .= "X-Service-Type: $serviceType\r\n";
    }

    return $headers;
}

function generateContactEmailBody($name, $phone, $email, $postcode, $service, $message) {
    $body = "Contact Form Inquiry\n\n";
    $body .= "Name: $name\n";
    $body .= "Phone: $phone\n";
    if (!empty($email)) $body .= "Email: $email\n";
    if (!empty($postcode)) $body .= "Postcode: $postcode\n";
    $body .= "Service Required: $service\n\n";
    $body .= "Message: $message\n";

    return $body;
}

function generateServiceEmailBody($serviceName, $name, $phone, $location, $propertyType, $vehicle, $serviceType, $safeType, $details, $safeBrand = '') {
    $body = "$serviceName Request\n\n";
    $body .= "Name: $name\n";
    $body .= "Phone: $phone\n";
    if (!empty($location)) $body .= "Location: $location\n";
    if (!empty($propertyType)) $body .= "Property Type: $propertyType\n";
    if (!empty($vehicle)) $body .= "Vehicle: $vehicle\n";
    if (!empty($serviceType)) $body .= "Service Type: $serviceType\n";
    if (!empty($safeType)) $body .= "Safe Type: $safeType\n";
    if (!empty($safeBrand)) $body .= "Safe Brand/Model: $safeBrand\n";
    if (!empty($details)) $body .= "Details: $details\n";

    return $body;
}
?>
