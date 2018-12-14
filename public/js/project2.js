$(function () {
    // API POST REQUEST TO ADD NEW REVIEW 
    $(".create-form").on("submit", function (event) {

        event.preventDefault();

        var newTesti = {
            // grab the values
            review: $("#text").val().trim(),
            author: $("#name").val().trim(),
            city: $("#city").val().trim()
        };

        // Send POST request

        $.ajax("/api/testimonials", {
            type: "POST",
            data: newTesti
        }).then(
            function () {
                console.log("New Review");
                // Reload the page to get updated list
                location.reload();
            }
        );
    });
});