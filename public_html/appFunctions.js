//Delete workout function
$(document).ready(function()
{
    $("#sure").hide();
    $("#deleted").hide(); 
    $("#thrashIcon").click(function()
    {
        $("#optionsContent").hide();
        $("#sure").show();
        $("#no").click(function()
        {
            $("#sure").hide();
            $("#optionsContent").show();
        });
        $("#yes").click(function()
        {
            $("#sure").hide();
            $("#deleted").show();
            $("#deleteOk").click(function()
            {
                $("#one").remove();
            });
        });
    });
});

//Sliders
$('input[type="range"]').val(10).change();

//Function to style burger menu
$(document).ready(function()
{
    $.event.special.tap.tapholdThreshold = 300,
    $("#burgerMenu").on("taphold", function()
    {
        $("#burger").attr("src", "resources/close.png");
    });
    $("#menu").on("popupafterclose", function(event)
    {
        $("#burger").attr("src", "resources/burger.png");
    });
});

//Setting up array for swipe function
var pageArray = ["home","profile","workouts"];
$(document).ready(function() 
    {
        $(document).on("swiperight", function() 
            {
                pageSwipe("right");
            });

        $(document).on("swipeleft", function() 
            {
                pageSwipe("left");
            });
    });
 
//Swipe function
function pageSwipe(direction)
    {
        var currentPageId = $(":mobile-pagecontainer").pagecontainer("getActivePage")[0].id;
        var currentPageIndex = pageArray.indexOf(currentPageId);
        var nextPageId;

        if(direction === "left")
            {
                nextPageId = pageArray[currentPageIndex+1];
            }
        else if(direction === "right")
            {
                nextPageId = pageArray[currentPageIndex-1];

            }
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#" + nextPageId);
    }