
if (typeof cordova !== "undefined") {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady();
}

function onDeviceReady() {
  // Set latest workout.
  if (typeof localStorage.exercise !== "undefined" && typeof localStorage.workout !== "undefined") {
    var workout = JSON.parse(localStorage.workout);
    $("#latest").text("Latest: " + workout.title);
  } else {
    $("#latest").text("Latest: none");
  }

  // Overlay Animation.
  function modifyOverlay(new_z_index) {
    if ($(".block").is(":hidden")) {
      $(".block").css("display", "block");
      $(".block").css("z-index", new_z_index); // 1 or 3
    } else if ($(".block").css("z-index") != new_z_index) {
      $(".block").css("z-index", new_z_index);
    }
    else if ($(".block").css("z-index") == "3" && $(".tab").is(":visible")) {
      $(".block").css("z-index", "1");
    } else if ($(".block").css("z-index") == "3" && $(".tab").is(":hidden")) {
      //$(".block").css("display", "none");
      //$(".block").css("z-index", "0");
      $(".block").css("background-color", "red");
    } else {
      $(".block").css("display", "none");
    }
  };

  // Radial Menu Animations.
  $("#fab").click(function() {
    modifyOverlay(1);
    $("#fab").toggleClass("dotUp dotDown");
    $(".rotate").toggleClass("rotateActive");
    $(".lighten").toggleClass("darken");
    $(".container").toggleClass("containerUp containerDown");
    $(".bigOne").toggleClass("bigOneOn");
    $(".bigTwo").toggleClass("bigTwoOn");
    $(".bigThree").toggleClass("bigThreeOn");
    $(".bigFour").toggleClass("bigFourOn");
  });

  // Nav Menu Animations.
  $(".burgerMenu").click(function() {
    modifyOverlay(3);
    $(".smlOne").toggleClass("smlOnOne");
    $(".smlTwo").toggleClass("smlOnTwo");
    $(".smlThree").toggleClass("smlOnThree");
  });

  // OVERVIEW OPTIONS
  // Delete Routine Dialogue.
  $("#delete").click(function() {
    modifyOverlay(3);
    $("#deleteRoutine").css("display", "block");
  });

  // Cancel Operation.
  $("#cancelDelete").click(function() {
    $("#deleteRoutine").css("display", "none");
    $(".block").css("display", "none");
  });

  // Change routine name.
  $(document).on("click", "#overviewTitle", function() {
    $(this).css("display", "none");
    $("#delete").css("display", "none");
    $("#changeName").css("display", "block");
  });

  // ROUTINE MAKER
  // Display exercise card.
  $(".exercise").click(function() {
    $("#specifier").css("display", "block");
    $(".backButton").css("display", "none");
    $("#infoP").text($(this).text());
  });

  // Hide exercise card.
  $("#exerciseCancel").click(function() {
    $("#specifier").css("display", "none");
    $("#overviewSpecifier").css("display", "none");
  });

  // VIRTUAL TRAINER OPTIONS
  // Show Pause Screen.
  $("#pauseButton").click(function() {
    modifyOverlay(1);
    $("#containPauseScreen").css("display", "block");
  });

  // Hide Pause Screen.
  $("#resumeIt").click(function() {
    $(".block").css("display", "none");
    $("#containPauseScreen").css("display", "none");
  });

  // Hide Feedback Screen.
  $("#replayWorkout").click(function() {
    $("#feedbackScreen").css("display", "none");
  });

  // PROGRESS CHART
  // Hide Progress Chart.
  $("#closeChart").click(function() {
    manageButton();
  });

  // Show progress Chart.
  displayChart();

  function displayChart() {
    var condition = localStorage.quickAccess;
    if(condition === "true") {
      $("#containChart").css("display", "block");
    }
  }

  function manageButton() {
    var condition = localStorage.quickAccess;
    if(condition === "true") {
      $("#closeChart").attr("href", "index.html");
    } else {
      $("#containChart").css("display", "none");
    }
  }

  // Keep chart displayed if clicked.
  localStorage.quickAccess = false;

  $("#view").click(function() {
    localStorage.quickAccess = true;
  });

  $("#showChart").click(function() {
    $("#containChart").css("display", "block");
    $(".navbarBack").css("display", "block");
    $(".navbarOptions").css("display", "block");
  });

  // Display Chart Options.
  $("#chartOptions").click(function() {
    modifyOverlay(3);
    $("#chartOptionsDialogue").css("display", "block");
    $(".navbarBack").css("display", "none");
    $(".navbarOptions").css("display", "none");
  });

  // NAVIGATE PAGES
  // Home
  $(".mainSquare").click(function() {
    $(location).attr("href", "timer.html");
  });

  $("#latest").click(function() {
    $(location).attr("href", "timer.html");
  });

  $("#change").click(function() {
    setInterval(function() {
      $(location).attr("href", "routines.html");
    }, 600);
  });

  $("#view").click(function() {
    setInterval(function() {
      $(location).attr("href", "profile.html");
    }, 600);
  });

  // Routines
  $("#chest").click(function() {
    setInterval(function() {
      $(location).attr("href", "exercises.html");
    }, 600);
  });

  $(document).on("click", ".startIt", function() {
    setInterval(function() {
      $(location).attr("href", "timer.html");
    }, 600);
  });

  $(document).on("click", ".cardOptions", function() {
    setInterval(function() {
      $(location).attr("href", "existingOverview.html");
    }, 600);
  });

  // NavBar
  $("#navOne").click(function() {
    $(location).attr("href", "routines.html");
  });

  $("#navTwo").click(function() {
    $(location).attr("href", "index.html");
  });

  $("#navThree").click(function() {
    $(location).attr("href", "profile.html");
  });
}
