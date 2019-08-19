var firebaseConfig = {
    apiKey: "AIzaSyCrxAYl0rG5x4ZhcDI5yTMpVAzyemXrSKM",
    authDomain: "train-activity-ab8f5.firebaseapp.com",
    databaseURL: "https://train-activity-ab8f5.firebaseio.com",
    projectId: "train-activity-ab8f5",
    storageBucket: "",
    messagingSenderId: "1065727305590",
    appId: "1:1065727305590:web:e1361418f3aa018a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train").val().trim();
    var trainFrequency = $("#frequency").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        tName: trainName,
        tDest: trainDestination,
        fTTime: firstTrainTime,
        tFreq: trainFrequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store variables.
    var trainName = childSnapshot.val().tName;
    var trainDestination = childSnapshot.val().tDest;
    var firstTrainTime = childSnapshot.val().fTTime;
    var trainFrequency = childSnapshot.val().tFreq;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment().format("HH:mm");

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % trainFrequency;  //equals train interval - remainder
        
        // Minute Until Train
        var minutesAway = trainFrequency - tRemainder;

        // Next Train
    var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

var time = setInterval(timeDisplay, 1000);

function timeDisplay(){
    var displayDateTime = moment().format('MMMM Do YYYY, HH:mm:ss a');
    $("#date-time").text("Current Time: " + displayDateTime);
}



    

