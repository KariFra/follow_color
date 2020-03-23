var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level = 0;
var started = false;

startTheGame();

function startTheGame() {
    $(document).keypress(function() {
        if (!started) {
            nextSequence();
            $("#level-title").text("Level " + level);
            started = true;
        }
    });
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
    chosenButtonShadow(randomChosenColour);

}


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    chosenButtonShadow(userChosenColour);
    checkTheAnswer(userClickedPattern.length - 1);


})

function checkTheAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function chosenButtonShadow(chosen) {
    $("#" + chosen).addClass("pressed");
    setTimeout(function() {
            $("#" + chosen).removeClass("pressed");
        },
        100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}