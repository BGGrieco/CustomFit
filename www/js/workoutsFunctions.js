
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
  console.log(workouts);

  // Fetch the right object on click.
  function handleButtonClick(event)
  {
    if (event.target != event.currentTarget)
    {
      var theWorkout = (workouts.find(workout => workout.title === event.currentTarget.dataset.workout));
      console.log(theWorkout);
      var theExercises = theWorkout.exercises;
      var workoutValues = JSON.stringify(theWorkout);
      var exerciseValues = JSON.stringify(theExercises);
      localStorage.workout = workoutValues;
      localStorage.exercise = exerciseValues;
    }
  }

  // Create Routine Card with appropriate parameters.
  function createCards(indexNumber, routine, icons, time)
  {
    var delay = indexNumber * 0.1;
    return `
    <li>
      <div class="card routineCard" data-workout="${routine}" style="animation-delay: ${delay}s">
        <div class="startIt">
          <div class="cardInfo rippleTab">
            <h3>${routine}</h3>
            <p>${time} min.</p>
            <div class="infoIcons">${icons}</div>
          </div>
        </div>
        <div class="cardOptions optionsRipple">
          <img class="cardCog" src="images/options.png" width="30" alt="" />
        </div>
      </div>
    </li>
    `
  }

  workouts.forEach(function(a, i)
  {
    var routine = a.title;
    var indexNumber = i;
    var time;
    var exercises = a.exercises;
    var icons;
    if (routine === "God Legs")
    {
      icons = "<img src='images/legs.png' width='18' alt='' /><img src='images/cardio.png' width='30' alt='' />"
      time = 7;
    }
    else if (routine === "Morning Stretch")
    {
      icons = "<img src='images/stretch.png' width='50' alt='' />"
      time = 5;
    }
    else if (routine === "Cardio Burst")
    {
      icons = "<img src='images/cardio.png' width='30' alt='' /><img src='images/legs.png' width='18' alt='' />"
      time = 7;
    }
    else if (routine === "Full Body" || "Muay Thai Warmup")
    {
      icons = "<img src='images/thorso.png' width='30' alt='' /><img src='images/legs.png' width='18' alt='' /><img src='images/cardio.png' width='30' alt='' /><img src='images/stretch.png' width='50' alt='' />"
      time = 10;
    }
    else
    {
      icons = "<img src='images/thorso.png' width='30' alt='' />"
      time = 1;
    }

    $("#cardList").append(createCards(indexNumber, routine, icons, time));
  });

  // EXISTING ROUTINE MODIFICATION
  // Compile Routine Overview List.
  /*if (typeof localStorage.exercise !== "undefined" && typeof localStorage.workout !== "undefined")
  {
    var obj = JSON.parse(localStorage.exercise);
    var title = JSON.parse(localStorage.workout);
    obj.forEach(function(exercise, e)
    {
      var id = "No" + e;
      $("#overviewList").append("<li><div class='overviewCard card' id='card" + id + "' onclick='edit(this)'><div class='overviewCardInfo' duration='" + exercise.duration + "' break='" + exercise.break + "'>\n\
      <h3>" + exercise.name + "</h3><p>" + exercise.duration + " sec.</p><p id='right'>Break: " + exercise.break + " sec.</p>\n\
      </div><div class='overviewCardOptions'><img src='images/thrash.png' width='23' alt='' /></div></div></li>");
    });
  }*/

  // Change name of routine.
  $("#changeName").keydown(function()
  {
    if (event.keyCode === 13)
    {
      var newName = $(this).val()
      $(this).css("display", "none");
      $(this).attr("value", newName);
      $("#overviewTitle").css("display", "block");
      $("#overviewTitle").text(newName);
      localStorage.newTitle = newName;
    }
  });

  // Show specifier.
  $(document).on("click", ".overviewCardInfo", function()
  {
    $("#overviewSpecifier").css("display", "block");
    $("#infoP").text($(this).find("h3").text());

    var clickedItemDuration = $(this).attr("duration");
    $("#timeValue").text(clickedItemDuration + " sec.");
    $("#determineTime").val(Number(clickedItemDuration)); // Set value of range input.
    localStorage.theDuration = clickedItemDuration;

    var breakVal = $(this).attr("break");
    $("#restValue").text(breakVal + " sec.");
    $("#determineRest").val(Number(breakVal)); // Set value of range input.
    localStorage.theBreak = breakVal;
  });

  // Store slider inputs.
  var time = document.getElementById("determineTime");
  var rest = document.getElementById("determineRest");

  // Write data to firebase: existing routine.
  $("#exerciseConfirm").click(function()
  {
    var timeValue = time.value;
    var restValue = rest.value;
    localStorage.theDuration = timeValue;
    localStorage.theBreak = restValue;
    $("#overviewSpecifier").css("display", "none");
  });

  // Delete Routine.
  $("#confirmDelete").click(function()
  {
    $("#deleteRoutine").css("display", "none");
    $(".block").css("display", "none");
    $(window).scrollTop(0);
    $("#existingOverview").toggleClass("deleteRoutine");
    setTimeout("location.href = 'routines.html';", 1500);
  });

  // PROGRESS TRACKING SECTION
  // Store feedback values, then push to Firebase.
  // var firebaseRef = firebase.database().ref();
  // $("#feedbackConfirm").click(function()
  // {
  //   var strength = document.getElementById("feedBackSliderOne").value;
  //   var cardio = document.getElementById("feedBackSliderTwo").value;
  //   var arrA = [0];
  //   var arrB = [0];
  //
  //   arrA.push(strength);
  //   arrB.push(cardio);
  //
  //   localStorage.strength = JSON.stringify(arrA);
  //   localStorage.cardio = JSON.stringify(arrB);
  // });

  // Miscellaneous functions.
  var handleThrashClick = function(event)
  {
    $(event.currentTarget).parents("li").toggleClass("toDelete");
  };

  $(document).on("click", ".overviewCardOptions", handleThrashClick);
  $(".card").on("click", handleButtonClick);

  if (typeof title !== "undefined")
  {
    $("#overviewTitle").html(title.title);
    $("#changeName").attr("value", title.title);
  }
}
