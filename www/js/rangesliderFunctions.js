$(document).ready(function()
{$(function()
{$(document).on("input","#determineTime",function(a)
{document.getElementById("timeValue").innerHTML=a.currentTarget.value+" sec.";if(a.currentTarget.value>0&&a.currentTarget.value<100)
{$("#timeValue").css("left","73%")}
else if(a.currentTarget.value>90)
{$("#timeValue").css("left","68%")}
else{$("#timeValue").css("left","78%")}});$(document).on("input","#determineRest",function(b)
{document.getElementById("restValue").innerHTML=b.currentTarget.value+" sec.";if(b.currentTarget.value>0&&b.currentTarget.value<100)
{$("#restValue").css("left","73%")}
else if(b.currentTarget.value>90)
{$("#restValue").css("left","68%")}
else{$("#restValue").css("left","78%")}});$(document).on("input","#feedBackSliderOne",function(x)
{var feedbackStrength;switch(x.currentTarget.value)
{case "0":feedbackStrength="YAWN";break;case "1":feedbackStrength="Broke a sweat";break;case "2":feedbackStrength="Just right";break;case "3":feedbackStrength="Intense";break;case "4":feedbackStrength="DYING"}
document.getElementById("feedbackOne").innerHTML=feedbackStrength});$(document).on("input","#feedBackSliderTwo",function(y)
{var feedbackCardio;switch(y.currentTarget.value)
{case "0":feedbackCardio="YAWN";break;case "1":feedbackCardio="Broke a sweat";break;case "2":feedbackCardio="Just right";break;case "3":feedbackCardio="Intense";break;case "4":feedbackCardio="DYING"}
document.getElementById("feedbackTwo").innerHTML=feedbackCardio});$("input[type=range]").rangeslider({polyfill:!1})})})
