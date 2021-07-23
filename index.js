var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
var best = 0;

$(document).ready(() => {
    var bgmusic = new Audio("sounds/bg.mp3");
    bgmusic.play();
})

// Random Next Pattern
function nextSequence () {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    level++;
    $("#level-title").html("Level " + level + " 🚩");

    animationGame(randomChosenColor);
}

// Animation and Sounds

function animationGame(ChosenColor){
    switch(ChosenColor) {
        case "red":
            $(".red").fadeOut(100).fadeIn(100);
            var redmusic = new Audio("sounds/red.mp3");
            redmusic.play();
            break;
        case "yellow":
            $(".yellow").fadeOut(100).fadeIn(100);
            var yellowmusic = new Audio("sounds/yellow.mp3");
            yellowmusic.play();
            break;
        case "green":
            $(".green").fadeOut(100).fadeIn(100);
            var greenmusic = new Audio("sounds/green.mp3");
            greenmusic.play();
            break;
        case "blue": 
            $(".blue").fadeOut(100).fadeIn(100);
            var bluemusic = new Audio("sounds/blue.mp3");
            bluemusic.play();
            break;
        default:
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break;
    }
    
}

// Click Handler

 $(".btn").on("click", function(){
        var userChosenColour = $(this).attr("id");
        var $this = $(this);

         $(this).addClass("pressed");
    
        setTimeout(() => { 
            $($this).removeClass("pressed");
        },100); 
        userClickedPattern.push(userChosenColour);


        animationGame(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    });



// Starting the game

$("h1").on("click", () => {
    if (!started){
        nextSequence();
        started = true;
    }
});

// Checking answer

function checkAnswer(userLevel) {
    if (gamePattern[userLevel] === userClickedPattern[userLevel]){
        console.log("gamePattern[userLevel] = " + gamePattern[userLevel] + " userClickedPatter[userLevel] = " + userClickedPattern[userLevel] );
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                best++;
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").css("background-color", "red");
        
        setTimeout(() => {
            $("body").css("background-color", "#7e0000");
        }, 300);


        $("#level-title").html("Game Over! Click Here to Restart")

        if (level > best){
            best = level - 1;
            console.log("Level :" + level + "  Best : " + best);
            $("#best").html("Best: " + best);
        }

        startOver();
    }
}

function startOver(){
        best = 0;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        started = false;
}

