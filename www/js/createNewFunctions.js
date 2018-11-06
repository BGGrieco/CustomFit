
if (typeof cordova !== "undefined")
{
  document.addEventListener("deviceready", onDeviceReady, false)
}
else
{
  onDeviceReady();
}

function onDeviceReady()
{
  var workouts = JSON.parse(localStorage.workouts);

  // NEW ROUTINE MODIFICATION
  // Store slider inputs.
  var time = document.getElementById("determineTime");
  var rest = document.getElementById("determineRest");
  var title = "Unnamed Routine";

  // Create new routine.
  $("#newExerciseConfirm").click(function()
  {
    var timeValue = time.value;
    var restValue = rest.value;
    var name = $("#infoP").text();
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
}
