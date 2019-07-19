
$("#add-train").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    // Write code to add the new animal into the movies array
    var newTrain = $("#trainNameInput").val();
    console.log(newTrain);

    // Clears the text field after creating the new button
    $("#trainNameInput").val("");

    $("#trainOne").text(newTrain);

    // The renderButtons function is called, rendering the list of animal buttons
  });
