$(document).ready(function() {
    // Handle form submission
    $('#studentForm').on('submit', function(event) {
      event.preventDefault(); // Prevent the form from reloading the page

      // Collect form data
      const studentData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        nearCity: $('#city').val()
      };

      // Send data to the server via AJAX
      $.ajax({
        url: 'http://localhost:3000/students', // Change to your backend endpoint
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(studentData),
        success: function(response) {
          // Display success message
          $('#alertMessage')
            .addClass('alert alert-success')
            .text('Student created successfully!')
            .show();
        },
        error: function(xhr) {
          // Display error message
          $('#alertMessage')
            .addClass('alert alert-danger')
            .text(`Error: ${xhr.responseJSON?.message || 'Failed to create student'}`)
            .show();
        }
      });
    });
  });