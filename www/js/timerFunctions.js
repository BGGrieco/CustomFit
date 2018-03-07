var label=document.getElementById("exerciseLabel");var button=document.getElementById("pauseButton");var counter=document.getElementById("exerciseCounter");var routine=document.getElementById("info");var current=0;var playing=!1;var countdownTimer=null;var workout=JSON.parse(localStorage.workout);beginWorkout();function beginWorkout()
{routine.innerHTML="Routine: "+workout.title;var ready=4;var readyTimer=setInterval(function()
{ready--;document.getElementById("readyCount").textContent=ready;if(ready===0)
{document.getElementById("readyCount").textContent="GO!";document.getElementById("readyCount").style.color="#58a7dd";soundPlay("sound/short.mp3")}
else if(ready<0)
{clearInterval(readyTimer)}},1000);setTimeout(function()
{init();$(".getReady").hide();document.getElementById("pauseButton").style.display="block"},5000)};function init()
{loop();button.addEventListener("click",toggle)}
function toggle()
{if(playing)
{pause()}
else{loop()}}
function pause()
{playing=!1;setLabel("Paused");if(countdownTimer)
{clearTimeout(countdownTimer)}}
function loop()
{playing=!0;setButtonText("Pause");var exercise=workout.exercises[current];if(!exercise)
{return done()}
countdown(exercise.duration,exercise.name,function()
{$("#timerImage").show();soundPlay("sound/long.mp3");countdown(exercise.break,"Break",function()
{$("#timerImage").hide();soundPlay("sound/short.mp3");current++;loop()})})}
function done()
{pause();document.getElementById("feedbackScreen").style.display="block"}
function countdown(seconds,label,callback)
{setLabel(label);setCounter(seconds);countdownTimer=setTimeout(function()
{seconds--;if(seconds<=0)
{return callback()}
countdown(seconds,label,callback)},1000)}
function setCounter(val)
{counter.innerHTML=val}
function setLabel(text)
{if(label.textContent===text)
{return}
label.innerHTML=text}
function setButtonText(label)
{}
$("#muteIt").click(function()
{changeImage()});var newsrc="muted";function changeImage()
{if(newsrc=="muted")
{document.images.pic.src="images/unMute.png";document.images.pic.width="32";document.images.pic.style.bottom="3px";newsrc="unMuted"}
else{document.images.pic.src="images/mute.png";document.images.pic.width="37";document.images.pic.style.bottom="0px";newsrc="muted"}}
function soundPlay(src)
{var audioElement=document.getElementById("player-src");audioElement.src=src;var myAudio=document.getElementById("player");myAudio.load();myAudio.play()}
