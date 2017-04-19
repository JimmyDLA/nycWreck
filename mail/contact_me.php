<?php

// Check for empty fields. If empty stop the script
if( empty($_POST['name'])    ||
    empty($_POST['email'])   ||
    empty($_POST['subject']) ||
    empty($_POST['message']) ||
    !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
    {
        echo "No arguments Provided!";
        return false;
    }

// Getting the values from the object that we sent
$name = $_POST['name'];
$email_address = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Create the email and send the message
$to = 'nycwreckamended@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage: $message";
$headers = "From: nycwreckamended@gmail.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to,$subject,$email_body,$headers);
return true;

?>
