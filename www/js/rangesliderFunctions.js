$(document).ready(function(){
  // SETUP RANGESLIDER
  $(function(){
    // CREATE/MODIFY WORKOUT SECTION
    // Time slider.
    $(document).on("input", "#determineTime", function(a){
      // Print value of rangeslider to document.
      document.getElementById("timeValue").innerHTML = a.currentTarget.value + " sec.";

      // Influence CSS to adjust display allignment, since "text-align: right"
      // does not seem to work in <output> elements.
      if (a.currentTarget.value > 0 && a.currentTarget.value < 100){
        $("#timeValue").css("left", "73%");
      }
      else if (a.currentTarget.value > 90){
        $("#timeValue").css("left", "68%");
      }
      else {
        $("#timeValue").css("left", "78%");
      }
    });

    // Rest time slider.
    $(document).on("input", "#determineRest", function(b){
      // Print value of rangeslider to document.
      document.getElementById("restValue").innerHTML = b.currentTarget.value + " sec.";

      // Influence CSS to adjust display allignment, since "text-align: right"
      // does not seem to work in <output> elements.
      if (b.currentTarget.value > 0 && b.currentTarget.value < 100){
        $("#restValue").css("left", "73%");
      }
      else if (b.currentTarget.value > 90){
        $("#restValue").css("left", "68%");
      }
      else {
        $("#restValue").css("left", "78%");
      }
    });

    // FEEDBACK SCREEN SECTION
    // Get integer value from feedback sliders and translate to strings, then:
    // Dynamically update DOM with translated output value.
    $(document).on("input", "#feedBackSliderOne", function(x){
      var feedbackStrength;
      switch (x.currentTarget.value){
        case "0":
          feedbackStrength = "YAWN";
          break;

        case "1":
          feedbackStrength = "Broke a sweat";
          break;

        case "2":
          feedbackStrength = "Just right";
          break;

        case "3":
          feedbackStrength = "Intense";
          break;

        case "4":
          feedbackStrength = "DYING";
      }
      document.getElementById("feedbackOne").innerHTML = feedbackStrength;
    });

    $(document).on("input", "#feedBackSliderTwo", function(y){
      var feedbackCardio;
      switch (y.currentTarget.value){
        case "0":
          feedbackCardio = "YAWN";
          break;

        case "1":
          feedbackCardio = "Broke a sweat";
          break;

        case "2":
          feedbackCardio = "Just right";
          break;

        case "3":
          feedbackCardio = "Intense";
          break;

        case "4":
          feedbackCardio = "DYING";
      }
      document.getElementById("feedbackTwo").innerHTML = feedbackCardio;
    });

    // Initialise rangeslider.js polyfill.
    $("input[type=range]").rangeslider({
      polyfill: false
    });
  });
});
