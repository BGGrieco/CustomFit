$(document).ready(function()
{Chart.pluginService.register({beforeDraw:function(chart,easing)
{if(chart.config.options.chartArea&&chart.config.options.chartArea.backgroundColor)
{var helpers=Chart.helpers;var ctx=chart.chart.ctx;var chartArea=chart.chartArea;ctx.save();var myGradient=ctx.createLinearGradient(0,0,0,360);myGradient.addColorStop(0,"#d36363");myGradient.addColorStop(0.25,"#89e894");myGradient.addColorStop(0.5,"#6eadea");myGradient.addColorStop(0.65,"#89e894");myGradient.addColorStop(1,"#d36363");ctx.fillStyle=myGradient;ctx.globalAlpha=0.6;ctx.fillRect(chartArea.left,chartArea.top,chartArea.right-chartArea.left,chartArea.bottom-chartArea.top);ctx.restore()}}});function newDate(days)
{return moment().add(days,'d')};var strength=JSON.parse(localStorage.strength);var cardio=JSON.parse(localStorage.cardio);var config={type:'line',data:{labels:[newDate(-4),newDate(-3),newDate(2),newDate(3),newDate(4),newDate(5),newDate(6)],datasets:[{label:"Strength",data:strength,backgroundColor:'rgba(0, 0, 255, 0)',borderColor:'rgba(0, 0, 255, 1)',borderWidth:1.5},{label:"Cardio",data:cardio,backgroundColor:'rgba(255, 0, 0, 0)',borderColor:'rgba(200, 0, 0, 1)',borderWidth:1.5}]},options:{chartArea:{backgroundColor:'#ffffff',},layout:{padding:{left:20,right:0,top:0,bottom:0}},scales:{xAxes:[{ticks:{suggestedMax:4,suggestedMin:4,stepSize:1},type:'time',time:{unit:'day',displayFormats:{'hour':'MMM DD','day':'MMM DD','week':'MMM DD','month':'MMM DD','year':'MMM DD'}}}],yAxes:[{ticks:{max:4,min:0,stepSize:1}}]},}};var ctx=document.getElementById("theChart").getContext("2d");var chart=new Chart(ctx,config);Chart.defaults.global.defaultFontColor="#58a7dd";Chart.defaults.global.defaultFontSize=10;$("#confirmSettings").click(function()
{setXAxis();$(".block").css("display","none");$("#chartOptionsDialogue").css("display","none")});function setXAxis()
{if(document.getElementById("daily").checked===!0)
{chart.options.scales.xAxes[0].time.unit="hour";chart.update()}
else if(document.getElementById("weekly").checked===!0)
{chart.options.scales.xAxes[0].time.unit="day";chart.update()}
else{chart.options.scales.xAxes[0].time.unit="week";chart.update()}}
$("#showCalendar").click(function()
{$("#containCalendar").css("display","block")});$("#closeCalendar").click(function()
{$("#containCalendar").css("display","none")})})
