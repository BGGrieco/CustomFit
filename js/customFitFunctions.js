$(document).ready(function()
{
  /**
  * ANIMATIONS SECTION
  *
  */
  // ANIMATIONS FOR NAV MENU, RADIAL MENU, CARDS, LOADING SCREEN AND DIALOGUE OVERLAY.
  // FAB fade in at start.
  $("#fab").fadeIn("slow");

  // Set latest workout.
  var title = JSON.parse(localStorage.workout);
  $("#latest").text("Latest: " + title.title);

  // Overlay Animation.
  function modifyOverlay(new_z_index)
  {
    /** If the overlay is hidden, we just show it with the z-index we
    * get in new_z_index (new_z_index == 1 means that dot was clicked,
    * new_z_index == 3 means that burger was clicked)
    */
    if ($(".block").is(":hidden"))
    {
      $(".block").css("display", "block");
      $(".block").css("z-index", new_z_index); // 1 or 3
    }
    else if ($(".block").css("z-index") != new_z_index)
    {
      /** Because of the first if, we know that the overlay
      * is visible (which means it has z-index 1 or 3).
      * The only time the current z-index of the overlay will
      * be different from the new_z_index (this is what we are
      * checking on this if) is when you click the burger
      * (new_z_index == 3) while the dot is also upfront
      * (current overlay z-index == 1)
      */
      $(".block").css("z-index", new_z_index); // So we just set the z-index
                                               // to new_z_index (which will
                                               // be 3) hidding the dot
    }
    else if ($(".block").css("z-index") == "3" && $(".tab").is(":visible"))
    {
      $(".block").css("z-index", "1");
    }
    else if ($(".block").css("z-index") == "3" && $(".tab").is(":hidden"))
    {
      //$(".block").css("display", "none");
      //$(".block").css("z-index", "0");
      $(".block").css("background-color", "red");
    }
    else
    {
      /** If we get to this else, we know that the overlay is visible
      * (because of the first if) and we know that the current
      * z-index is equal to the new_z_index (because of the second
      * if).
      * So the possible cases are:
      * overlay's z-index is 3, and we pressed the burger (3)
      * or overlay's z-index is 1, and we pressed the dot (1),
      * both cases mean we hide the overlay
      */
      $(".block").css("display", "none");
    }
  };

  // Radial Menu Animations.
  $("#fab").click(function()
  {
    modifyOverlay(1);
    $(".dot").toggleClass("dotUp dotDown");
    $(".rotate").toggleClass("rotateActive");
    $(".container").toggleClass("containerUp containerDown");
    $(".bigOne").toggleClass("bigOneOn");
    $(".bigTwo").toggleClass("bigTwoOn");
    $(".bigThree").toggleClass("bigThreeOn");
    $(".bigFour").toggleClass("bigFourOn");
  });

  // Nav Menu Animations.
  $(".burgerMenu").click(function()
  {
    modifyOverlay(3);
    $(".barTop").toggleClass("barTopOn");
    $(".barMid").toggleClass("barMidOn");
    $(".barBot").toggleClass("barBotOn");
    $(".smlOne").toggleClass("smlOnOne");
    $(".smlTwo").toggleClass("smlOnTwo");
    $(".smlThree").toggleClass("smlOnThree");
  });

  // OVERVIEW OPTIONS
  // Delete Routine Dialogue.
  $("#delete").click(function()
  {
    modifyOverlay(3);
    $("#deleteRoutine").css("display", "block");
  });

  // Cancel Operation.
  $("#cancelDelete").click(function()
  {
    $("#deleteRoutine").css("display", "none");
    $(".block").css("display", "none");
  });

  // Re-name existing.
  $(document).on("click", "#overviewTitle", function()
  {
    $(this).css("display", "none");
    $("#changeName").css("display", "block");
  });

  $("#existingOverview").find("input[type=text]", function()
  {
    $(this).attr("placeholder", "AYYYY");
  });

  // ROUTINE MAKER
  // Display exercise card.
  $(".exercise").click(function()
  {
    $("#specifier").css("display", "block");
    $(".backButton").css("display", "none");
    $("#infoP").text($(this).text());
  });

  // Hide exercise card.
  $("#exerciseCancel").click(function()
  {
    $("#specifier").css("display", "none");
    $("#overviewSpecifier").css("display", "none");
  });

  // Name new routine.
  $(document).on("click", "#overviewTitle", function()
  {
    $(this).css("display", "none");
    $("#changeName").css("display", "block");
  });

  $("#existingOverview").find("input[type=text]", function()
  {
    $(this).attr("placeholder", "AYYYY");
  });

  // VIRTUAL TRAINER OPTIONS
  // Show Pause Screen.
  $("#pauseButton").click(function()
  {
    modifyOverlay(1);
    $("#containPauseScreen").css("display", "block");
  });

  // Hide Pause Screen.
  $("#resumeIt").click(function()
  {
    $(".block").css("display", "none");
    $("#containPauseScreen").css("display", "none");
  });

  // Hide Feedback Screen.
  $("#replayWorkout").click(function()
  {
    $("#feedbackScreen").css("display", "none");
  });

  // PROGRESS CHART
  // Hide Progress Chart.
  $("#closeChart").click(function()
  {
    manageButton();
  });

  // Show progress Chart.
  displayChart();

  function displayChart()
  {
    var condition = localStorage.quickAccess;
    if(condition === "true")
    {
      $("#containChart").css("display", "block");
    }
  }

  function manageButton()
  {
    var condition = localStorage.quickAccess;
    if(condition === "true")
    {
      $("#closeChart").attr("href", "index.html");
    }
    else
    {
      $("#containChart").css("display", "none");
    }
  }

  // Keep chart displayed if clicked.
  localStorage.quickAccess = false;

  $("#view").click(function()
  {
    localStorage.quickAccess = true;
  });

  $("#showChart").click(function()
  {
    $("#containChart").css("display", "block");
  });

  // Display Chart Options.
  $("#chartOptions").click(function()
  {
    modifyOverlay(3);
    $("#chartOptionsDialogue").css("display", "block");
  });
});
