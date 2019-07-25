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

var trainName= "";
var trainDestination= "";
var trainTime= "";
var trainFrequency= 0;

var firstTimeConverted = moment(trainTime, "HH:mmA").subtract(1, "years");
    console.log(firstTimeConverted);

var currentTime = moment();
    console.log(moment(currentTime).format("hh:mmA"));

$("#add-train").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    var newTrainName = $("#trainNameInput").val();
    var newDestination = $("#destinationInput").val();
    var newFrequency = $("#frequencyInput").val();
    var firstTrainTime = $("#firstTrainInput").val();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      name : newTrainName,
      destination : newDestination,
      frequency : newFrequency,
      time : firstTrainTime,
    };

  



    // uploads employee data to the database
    database.ref().push(newTrain);


    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.frequency);
    // console.log(newTrain.time);

    // alert("Train successfully added");

      // Clears the text field after creating the new train
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#firstTrainInput").val("");
 });
    
    database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

      trainName = childSnapshot.val().name;
      trainDestination = childSnapshot.val().destination;
      trainTime = childSnapshot.val().time;
      trainFrequency = childSnapshot.val().frequency;
      
      
      
      console.log(trainName);
      console.log(trainDestination);
      console.log(trainTime);
      console.log(trainFrequency);
      
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % trainFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = trainFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mmA"));

      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDestination),
          $("<td>").text(trainFrequency),
          $("<td>").text(nextTrain),
          $("<td>").text(tMinutesTillTrain),
      );
      
      // Appending all the new information to the new table row
      $("#train-table > tbody").append(newRow);
    });

   

  
 
