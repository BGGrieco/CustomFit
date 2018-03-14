// Configure Firebase.
var config =
{
  apiKey: "AIzaSyCogF5kaBbbs-2ME020FoTMd17_2ylydq4",
  authDomain: "customfit-5281b.firebaseapp.com",
  databaseURL: "https://customfit-5281b.firebaseio.com",
  projectId: "customfit-5281b",
  storageBucket: "customfit-5281b.appspot.com",
  messagingSenderId: "789910251533"
};
// Initialize Firebase.
firebase.initializeApp(config);
// Reference data.
var dbRef = firebase.database().ref().child("workouts");
// Sync with Firebase in real time.
dbRef.on("value", snap =>
{
  var workouts = snap.val();

  // NEW ROUTINE MODIFICATION
  // Store slider inputs.
  var time = document.getElementById("determineTime");
  var rest = document.getElementById("determineRest");

  // Create new routine.
  $("#newExerciseConfirm").click(function()
  {
    var timeValue = time.value;
    var restValue = rest.value;
    var name = $("#infoP").text();
    var title = "Unnamed Routine";
    var addExercise =
    {
      "name": name,
      "duration": timeValue,
      "break": restValue
    };

    var newRoutine =
    {
      "title": title,
      "exercises":
      [
        {
          "name": name,
          "duration": timeValue,
          "break": restValue
        }
      ]
    };

    if (localStorage.makingNew === "false")
    {
      localStorage.newRoutine = JSON.stringify(newRoutine);
    }
    else
    {
      var arr = JSON.parse(localStorage.newRoutine);
      arr.exercises.push(addExercise);
      localStorage.newRoutine = JSON.stringify(arr);
    }
  });

  // Compile Routine Overview List.
  var newObj = JSON.parse(localStorage.newRoutine);
  var arr = newObj.exercises;
  var newTitle = newObj.title;
  arr.forEach(function(i)
  {
    $("#newOverviewList").append("<li><div class='overviewCard'><div class='overviewCardInfo' duration='" + i.duration + "' break='" + i.break + "'>\n\
    <h3>" + i.name + "</h3><p>" + i.duration + " sec.</p><p id='right'>Break: " + i.break + " sec.</p>\n\
    </div><div class='overviewCardOptions'><img src='images/thrash.png' width='23' alt='' /></div></div></li>");
  });

  // Set name of new routine.
  $("#newChangeName").keydown(function()
  {
    if (event.keyCode === 13)
    {
      var newName = $(this).val()
      $(this).css("display", "none");
      $(this).attr("value", newName);
      $("#newOverviewTitle").css("display", "block");
      $("#newOverviewTitle").text(newName);
      localStorage.newTitle = JSON.stringify(newName);
    }
  });

  // Miscellaneous functions.
  var handleThrashClick = function(event)
  {
    $(event.currentTarget).parents("li").toggleClass("toDelete");
  };

  $(document).on("click", ".overviewCardOptions", handleThrashClick);
  $("#newOverviewTitle").html(newTitle);
  $("#loadingSquare").css("display", "none");
  $("#confirm").click(function()
  {
    window.location.href = "routines.html";
  });

  // Push new routine to Firebase.
  var firebaseRef = firebase.database().ref();
  var createdExercise = JSON.parse(localStorage.newRoutine);
  var i = workouts.length;
  $("#save").click(function()
  {
    createdExercise.title = localStorage.newTitle;
    console.log(createdExercise.title);
    firebaseRef.child("workouts").child(i).push(createdExercise);
  });
});

// LOADING BAR ANIMATION
load();

function load()
{
  var bar = document.getElementById("progressBar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame()
  {
    if (width >= 99)
    {
      clearInterval(id);
    }
    else
    {
      width++;
      bar.style.width = width + '%';
      bar.innerHTML = width * 1 + '%';
    }
  }
};
