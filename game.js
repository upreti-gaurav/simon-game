var gamePattern = [];
var userClickedPattern = [];
var buttomColors = ['red', 'blue', 'green', 'yellow'];
var level = 0;
var started = false;

$('body').keypress(function(event) {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});

$('.btn').on('click', function() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);       // calling the function to play sound
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);        // calling the function to check answer
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {
        console.log("wrong");  
        var wrongAnswer = new Audio('sounds/wrong.mp3');
        wrongAnswer.play();
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        $("#level-title").text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() *4) ;       // random number generated
    var randomChosenColor = buttomColors[randomNumber];     // choosing the color from 'buttonColors' array
    gamePattern.push(randomChosenColor);                    // pushing the color to the 'gamePattern array'

    // choosing the button and using flash
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);       // calling the function to play sound
}

function playSound(name) {
    // adding the audio according to the chosen color
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();    
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
