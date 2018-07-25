
var config = {
  apiKey: "AIzaSyAUtdTzTeeCBmBKRLpnKt6Q7mk6FDv5nqo",
  authDomain: "trainscheduleapp-9bf62.firebaseapp.com",
  databaseURL: "https://trainscheduleapp-9bf62.firebaseio.com",
  projectId: "trainscheduleapp-9bf62",
  storageBucket: "",
  messagingSenderId: "699457093357"
};
firebase.initializeApp(config);

var trainData = firebase.database();

$("#submit").on("click", function () {

  var trainName = $("#trainName").val().trim();
  var destination = $("#dest").val().trim();
  var firstTrain = $("#firstTime").val().trim();
  var frequency = $("#freq").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {

    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  trainData.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#dest").val("");
  $("#firstTime").val("");
  $("#freq").val("");

  // Determine when the next train arrives.
  return false;
});

trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var timeArr = tFirstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {

    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;

    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }
  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
    tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});
