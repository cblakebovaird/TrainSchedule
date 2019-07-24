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
      // next : nextTrain,
      // minutes : tMinutesTillTrain
    };

    var tFrequency = newFrequency;

    var firstTime = firstTrainTime;
    console.log(firstTime);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    currentTimeConverted = moment(currentTime).format("HH:mm");
    console.log(currentTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTime, "minutes"));
    console.log("DIFFERENCE IN TIME: " + diffTime);

     // Time apart (remainder)
     var tRemainder = diffTime % tFrequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var tMinutesTillTrain = tFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 
     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    // uploads employee data to the database
    database.ref().push(newTrain);


    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.first);

    alert("Train successfully added");

      // Clears the text field after creating the new train
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#firstTrainInput").val("");
    
 });
    

  


    database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);

      var tr = $("<tr>");

      var tdName = $("<td>").text(childSnapshot.val().name);
      var tdDestination = $("<td>").text(childSnapshot.val().destination);
      var tdFrequency = $("<td>").text(childSnapshot.val().frequency);
      var tdArrival = $("<td>").text(childSnapshot.val().nextTrain);
      var tdMinAway = $("<td>").text(childSnapshot.val().tMinutesTillTrain);

      tr.append(tdName).append(tdDestination).append(tdFrequency).append(tdArrival).append(tdMinAway);

      $(".tbody").append(tr);



    });

   

  
 
