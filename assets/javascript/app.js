 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyA-IqiNClsRtS41AhANnpOkbtcUEUQDiRc",
  authDomain: "trainschedule-22ea3.firebaseapp.com",
  databaseURL: "https://trainschedule-22ea3.firebaseio.com",
  projectId: "trainschedule-22ea3",
  storageBucket: "",
  messagingSenderId: "792518542250",
  appId: "1:792518542250:web:2288a9072dcc787e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    // Write code to add the new animal into the movies array
    var newTrainName = $("#trainNameInput").val().trim();
    var newDestination = $("#destinationInput").val().trim();
    var newFrequency = $("#frequencyInput").val().trim();
    var firstTrainTime = $("firstTrainInput").val().trim();
    
        // Clears the text field after creating the new button
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#firstTrainInput").val("");
    

    var newtrain = {
      name : newTrainName,
      destination : newDestination,
      frequency : newFrequency,
      firstTime : firstTrainTime
    }

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


    database.ref().push(newtrain);

    console.log(newtrain);

    database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);

      var tr = $("<tr>");

      var tdName = $("<td>").text(childSnapshot.val().name);
      var tdDestination = $("<td>").text(childSnapshot.val().destination);
      var tdFrequency = $("<td>").text(childSnapshot.val().frequency);

      tr.append(tdName).append(tdDestination).append(tdFrequency);

      $(".tbody").append(tr);



    });

   

    // The renderButtons function is called, rendering the list of animal buttons
  });
