
if (typeof cordova !== "undefined") {
  document.addEventListener("deviceready", onDeviceReady, false)
}
else {
  onDeviceReady();
}

function onDeviceReady() {
  var workouts = JSON.parse(localStorage.workouts);

  var exercises = ["Push Ups", "Plank", "Sit Ups", "Leg Ups", "Russian Twists", "Back Raises", "Burpees", "Mountain Climbers"];

  function createCards(indexNumber, exercise, image) {
    var delay = indexNumber * 0.05;
    return `
    <div class="exercise card" style="animation-delay: ${delay}s">
      ${image}
      <div class="h3Container">
        <h3>${exercise}</h3>
      </div>
    </div>
    `
  }

  exercises.forEach(function(a, i) {
    var exercise = a;
    var indexNumber = i;
    var image;

    switch(exercise) {
      case "Push Ups":
        image = "<img src='images/pushUps.png' width='110' alt='' />";
        break;

      case "Plank":
        image = "<img src='images/plank.png' width='110' alt='' />";
        break;

      case "Sit Ups":
        image = "<img src='images/sitUps.png' width='90' style='top: 25px;' alt='' />";
        break;

      case "Leg Ups":
        image = "<img src='images/legUps.png' width='90' style='top: 15px;' alt='' />";
        break;

      case "Russian Twists":
        image = "<img src='images/twists.png' width='110' style='top: 25px;' alt='' />";
        break;

      case "Back Raises":
        image = "<img src='images/backRaises.png' width='115' alt='' />";
        break;

      case "Burpees":
        image = "<img src='images/burpee.png' width='80' style='top: 20px;' alt='' />";
        break;

      default:
        image = "<img src='images/climber.png' width='110' alt='' />";
    }
    $("#exerciseContainer").append(createCards(indexNumber, exercise, image));
  });

  // NEW ROUTINE MODIFICATION
  // Store slider inputs.
  var time = document.getElementById("determineTime");
  var rest = document.getElementById("determineRest");

  var routineNamed;

  // Set name of new routine.
  $("#changeName").keydown(function() {
    if (event.keyCode === 13) {
      var newName = $(this).val();
      $(this).attr("value", newName);
      $(this).css("display", "none");
      $("#overviewTitle").css("display", "block");
      $("#delete").css("display", "block");
      $("#overviewTitle").text(newName);
      localStorage.newTitle = JSON.stringify(newName);
      routineNamed = true;
      localStorage.weHaveName = JSON.stringify(routineNamed);
    }
  });

  // Determine if routine title exists.
  // var fetchName = JSON.parse(localStorage.weHaveName);
  // if (fetchName === true)
  // {
  //   var theName = localStorage.newTitle;
  //   $("#overviewTitle").text(theName);
  // }
  // else
  // {
  //   $("#overviewTitle").text("Unnamed Routine");
  // }

  // Create new routine.
  var title = localStorage.newTitle;
  console.log(title);
  $("#newExerciseConfirm").click(function() {
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

    if (localStorage.makingNew === "false") {
      localStorage.newRoutine = JSON.stringify(newRoutine);
    }
    else {
      var arr = JSON.parse(localStorage.newRoutine);
      arr.exercises.push(addExercise);
      localStorage.newRoutine = JSON.stringify(arr);
    }
  });

  // Compile Routine Overview List.
  var newObj = JSON.parse(localStorage.newRoutine);
  var arr = newObj.exercises;
  var newTitle = newObj.title;
  arr.forEach(function(a, i) {
    var delay = i * 0.1;
    $(".overviewList").append("<li><div class='overviewCard card' style='animation-delay: " + delay + "s'><div class='overviewCardInfo' duration='" + a.duration + "' break='" + a.break + "'>\n\
    <h3>" + a.name + "</h3><p>" + a.duration + " sec.</p><p id='right'>Break: " + a.break + " sec.</p>\n\
    </div><div class='overviewCardOptions'><img src='images/thrash.png' width='23' alt='' /></div></div></li>");
  });

  // Miscellaneous functions.
  var handleThrashClick = function(event) {
    $(event.currentTarget).parents("li").toggleClass("toDelete");
  };

  $(document).on("click", ".overviewCardOptions", handleThrashClick);
  $("#newOverviewTitle").html(newTitle);
  $("#loadingSquare").css("display", "none");
  $("#confirm").click(function() {
    window.location.href = "routines.html";
  });

  // Push new routine to Routines array.
  var createdExercise = JSON.parse(localStorage.newRoutine);
  $("#save").click(function() {
    console.log(createdExercise)
    createdExercise.title = localStorage.newTitle;
    // console.log(createdExercise.title);
    workouts.unshift(createdExercise);
    // console.log(workouts);
  });

  // Push new routine to Firebase.
  // var firebaseRef = firebase.database().ref();
  // var createdExercise = JSON.parse(localStorage.newRoutine);
  // var i = workouts.length;
  // $("#save").click(function()
  // {
  //   createdExercise.title = localStorage.newTitle;
  //   console.log(createdExercise.title);
  //   firebaseRef.child("workouts").child(i).push(createdExercise);
  // });
}
