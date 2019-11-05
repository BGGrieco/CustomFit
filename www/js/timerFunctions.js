// WORKOUT INFORMATION SECTION
// Set up variables
var label = document.getElementById("exerciseLabel");
var button = document.getElementById("pauseButton");
var counter = document.getElementById("exerciseCounter");
var routine = document.getElementById("info");
var current = 0;
var playing = false;
var countdownTimer = null;
var workout = JSON.parse(localStorage.workout);

// LOOPING TIMER FUNCTION
// Initialise virtual trainer.
beginWorkout();

function beginWorkout() {
  routine.innerHTML = "Routine: " + workout.title;

  // Give 3 seconds for user to prepare.
  var ready = 4;
  var readyTimer = setInterval(function() {
    ready--;
    document.getElementById("readyCount").textContent = ready;
    if (ready === 0) {
      document.getElementById("readyCount").textContent = "GO!";
      document.getElementById("readyCount").style.color = "#58a7dd";
      soundPlay("sound/short.mp3");
    } else if(ready < 0) {
      clearInterval(readyTimer);
    }
  },1000);

  // Hide ready screen and cycle through selected workout.
  setTimeout(function() {
    init();
    $(".getReady").hide();
    document.getElementById("pauseButton").style.display = "block";
  }, 5000);
};

/**
* Bind loop start to click on button.
*
* @return {void}
*/
function init() {
  loop();
  button.addEventListener("click", toggle);
}

/**
* Play / Stop exercising.
*
* @return {void}
*/
function toggle() {
  if (playing) {
    pause();
  } else {
    loop();
  }
}

/**
* Reset timer. <--SHOULD BE PAUSE
*
* @return {void}
*/
function pause() {
  playing = false;
  setLabel("Paused");
  //setCounter('--')
  if (countdownTimer) {
    clearTimeout(countdownTimer); // FIGURE OUT HOW NOT TO CLEAR
  }
}

// TIMER FUNCTION
/**
* Timer loop function
*
* @return {void}
*/
function loop() {
  playing = true;

  // Change button label.
  setButtonText("Pause");

  // Get current exercise.
  var exercise = workout.exercises[current];

  // If out of the exercises Array's bounds, call 'done'.
  if (!exercise) {
    return done();
  }
  // Otherwise run countdown and update UI.
  countdown(exercise.duration, exercise.name, function() {
    $("#timerImage").show();
    soundPlay("sound/long.mp3");
    countdown(exercise.break, "Break", function() {
      $("#timerImage").hide();
      soundPlay("sound/short.mp3");
      // Next exercise.
      current++;
      // Re-iterate until finished.
      loop();
    });
  });
}

/**
* Exercise session is now over.
*
* @return {void}
*/
function done() {
  pause();
  document.getElementById("feedbackScreen").style.display = "block";
}

/**
* Recursive timer function.
*
* @param  {Number} seconds
* @param  {String} label
* @param  {Function} callback
* @return {void}
*/
function countdown(seconds, label, callback) {
  setLabel(label);
  setCounter(seconds);

  // Set timeout to next second.
  countdownTimer = setTimeout(function() {
    // Decrease seconds.
    seconds--;

    // Check whether the countdown is over - execute callback if so.
    if (seconds <= 0) {
      return callback();
    }

    // Call itself with a lower number otherwise.
    countdown(seconds, label, callback);
  }, 1000); // (1 sec).
}

/**
* Set counter text.
*
* @param  {Number} val
* @return {void}
*/
function setCounter(val) {
  counter.innerHTML = val;
}

/**
* Set label text.
*
* @param  {String} text
* @return {void}
*/
function setLabel(text) {
  if (label.textContent === text) {
    return;
  }
  label.innerHTML = text;
}

/**
* Set button text.
*
* @param  {String} text
* @return {void}
*/
function setButtonText(label) {
//  button.innerHTML = label;
}

// Change mute option image.
$("#muteIt").click(function() {
  changeImage();
});

var newsrc = "muted";

function changeImage() {
  if ( newsrc === "muted" ) {
    document.images["pic"].src = "images/unMute.png";
    document.images["pic"].width = "32";
    document.images["pic"].style.bottom = "3px";
    newsrc = "unMuted";
  } else {
    document.images["pic"].src = "images/mute.png";
    document.images["pic"].width = "37";
    document.images["pic"].style.bottom = "0px";
    newsrc = "muted";
  }
}

function soundPlay(src) {
  var audioElement = document.getElementById("player-src");
  audioElement.src = src;
  var myAudio = document.getElementById("player");
  myAudio.load();
  myAudio.play();
}

function getFeedback() {
  var theStrength = document.getElementById("feedbackSliderOne");
  var theCardio = document.getElementById("feedbackSliderTwo");

  storeStrength = theStrength.value;
  storeCardio = theCardio.value;

  localStorage.strength = storeStrength;
  localStorage.cardio = storecardio;
}
