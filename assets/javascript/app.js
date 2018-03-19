$(function () {

  var config = {
    apiKey: "AIzaSyAUtdTzTeeCBmBKRLpnKt6Q7mk6FDv5nqo",
    authDomain: "trainscheduleapp-9bf62.firebaseapp.com",
    databaseURL: "https://trainscheduleapp-9bf62.firebaseio.com",
    projectId: "trainscheduleapp-9bf62",
    storageBucket: "",
    messagingSenderId: "699457093357"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var trainName = "";
  var dest = "";
  var firstTime = "";
  var freq = "";

  $("#submit").click(function () {
      var isValid = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]?$/.test($("#firstTime").value);
    console.log(isValid)
      
  
  })
})
