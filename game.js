const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStartedFlag = false;
var currentLevel = 0;

function nextSequence() {
    userClickedPattern = [];
    currentLevel += 1;
    $('#level-title').html('level ' + currentLevel);

    var randomNumber =  Math.floor(Math.random() * Math.floor(4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () { $("#" + currentColor).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if(userClickedPattern.length === gamePattern.length ) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else { 
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(function () {$('body').removeClass("game-over"); }, 200);
        $('#level-title').html('Game Over, Press Any Key to Restart');
        startOver();
     }
}

function startOver() {
    currentLevel = 0;
    gamePattern = [];
    gameStartedFlag = false;
}

$('.btn').click((event) => {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(() => {
    if(!gameStartedFlag) {
        $('#level-title').html('Level ' + currentLevel);
        nextSequence();
        gameStartedFlag = true;
    }
});
