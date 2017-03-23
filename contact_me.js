$(document).ready(function() {

    $('form').on('submit', function(event) {
        // Prevent default posting of form
        event.preventDefault();

        // Creating object with all of the form values
        var data = {
            name: document.getElementById('inputName').value,
            email: document.getElementById('inputEmail').value,
            subject: document.getElementById('inputSubject').value,
            message: document.getElementById('inputMessage').value
        };

        // Making ajax call. Sending data from JS to PHP
        $.ajax({
            url: "../mail/contact_me.php",
            type: "POST",
            data: data
        }).done(function(data) {
            console.log('success!');
            //hide and unhide elements
            //clear all fields
            $('#contactForm').trigger("reset");
        }).fail(function() {
            console.log('fail!');
            //hide and unhide elements

        });

    });

});
