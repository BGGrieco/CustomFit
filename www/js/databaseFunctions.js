
if (typeof cordova !== "undefined") {
  document.addEventListener("deviceready", onDeviceReady, false)
}
else {
  onDeviceReady();
}


function onDeviceReady() {
  // Configure Firebase.
  var config = {
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

  // Sync with Firebase on launch.
  updateData();

  function updateData() {
    if (localStorage.getItem("updated") === null) {
      dbRef.on("value", snap => {
        var value = JSON.stringify(snap.val());
        localStorage.workouts = value;
        console.log(value);
      })
      localStorage.setItem("updated", true);
    }
  }

  // LOADING BAR ANIMATION
  load();

  setTimeout(function () {
    $("#loading").css("display", "none");
  }, 100);

  function load() {
    var bar = $("#progressBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 99) {
        clearInterval(id);
      }
      else {
        width++;
        bar.width( width + '%');
        bar.html(width * 1 + '%');
      }
    }
  }
}
