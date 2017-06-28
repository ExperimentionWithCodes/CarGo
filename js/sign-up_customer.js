$(function() {

    $("#CustomerSignUp input,#CustomerSignUp textarea").jqBootstrapValidation({ //look for replacement for textarea
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#cust_name").val();
            var email = $("input#cust_email").val();
            var phone = $("input#cust_phone").val();
            var message = $("textarea#cust_address").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php", //∏PLEASE CHECK THIS∏
                type: "POST",
                data: {
                    name: cust_name,
                    phone: cust_phone,
                    email: cust_email,
                    address: cust_address
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Success!!</strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#CustomerSignUp').trigger("reset");
                },
                //error: function() {
                    // Fail message
                  //  $('#success').html("<div class='alert alert-danger'>");
                    //$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                     //   .append("</button>");
                    //$('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    //$('#success > .alert-danger').append('</div>');
                    //clear all fields
                    //$('#CustomerSignUp').trigger("reset");
                //},
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
