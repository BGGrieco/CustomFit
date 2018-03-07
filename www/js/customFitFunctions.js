if(typeof cordova!=='undefined'){document.addEventListener("deviceready",onDeviceReady,!1)}else{onDeviceReady()}
function onDeviceReady()
{$("#fab").fadeIn("slow");JSON.parse(localStorage.workout);$("#latest").text("Latest: "+title.title);function modifyOverlay(new_z_index)
{if($(".block").is(":hidden"))
{$(".block").css("display","block");$(".block").css("z-index",new_z_index)}
else if($(".block").css("z-index")!=new_z_index)
{$(".block").css("z-index",new_z_index)}
else if($(".block").css("z-index")=="3"&&$(".tab").is(":visible"))
{$(".block").css("z-index","1")}
else if($(".block").css("z-index")=="3"&&$(".tab").is(":hidden"))
{$(".block").css("background-color","red")}
else{$(".block").css("display","none")}};$("#fab").click(function()
{modifyOverlay(1);$(".dot").toggleClass("dotUp dotDown");$(".rotate").toggleClass("rotateActive");$(".container").toggleClass("containerUp containerDown");$(".bigOne").toggleClass("bigOneOn");$(".bigTwo").toggleClass("bigTwoOn");$(".bigThree").toggleClass("bigThreeOn");$(".bigFour").toggleClass("bigFourOn")});$(".burgerMenu").click(function()
{modifyOverlay(3);$(".smlOne").toggleClass("smlOnOne");$(".smlTwo").toggleClass("smlOnTwo");$(".smlThree").toggleClass("smlOnThree")});$("#delete").click(function()
{modifyOverlay(3);$("#deleteRoutine").css("display","block")});$("#cancelDelete").click(function()
{$("#deleteRoutine").css("display","none");$(".block").css("display","none")});$(document).on("click","#overviewTitle",function()
{$(this).css("display","none");$("#changeName").css("display","block")});$("#existingOverview").find("input[type=text]",function()
{$(this).attr("placeholder","AYYYY")});$(".exercise").click(function()
{$("#specifier").css("display","block");$(".backButton").css("display","none");$("#infoP").text($(this).text())});$("#exerciseCancel").click(function()
{$("#specifier").css("display","none");$("#overviewSpecifier").css("display","none")});$(document).on("click","#overviewTitle",function()
{$(this).css("display","none");$("#changeName").css("display","block")});$("#existingOverview").find("input[type=text]",function()
{$(this).attr("placeholder","AYYYY")});$("#pauseButton").click(function()
{modifyOverlay(1);$("#containPauseScreen").css("display","block")});$("#resumeIt").click(function()
{$(".block").css("display","none");$("#containPauseScreen").css("display","none")});$("#replayWorkout").click(function()
{$("#feedbackScreen").css("display","none")});$("#closeChart").click(function()
{manageButton()});displayChart();function displayChart()
{var condition=localStorage.quickAccess;if(condition==="true")
{$("#containChart").css("display","block")}}
function manageButton()
{var condition=localStorage.quickAccess;if(condition==="true")
{$("#closeChart").attr("href","index.html")}
else{$("#containChart").css("display","none")}}
localStorage.quickAccess=!1;$("#view").click(function()
{localStorage.quickAccess=!0});$("#showChart").click(function()
{$("#containChart").css("display","block")});$("#chartOptions").click(function()
{modifyOverlay(3);$("#chartOptionsDialogue").css("display","block")})}
