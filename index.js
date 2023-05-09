var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 1;
var gameStarted = false;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("h1").text("Level "+level);
    level++;
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    console.log(gamePattern)
    
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour)
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAns(userClickedPattern.length-1);
    
});


function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

$(document).keydown(function(){
    if (gameStarted==false){
        $("h2").text("");
        $("h1").css("margin","5%")
        nextSequence();
        gameStarted=true;
    }
});

function checkAns(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);}
    
        
       }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        playSound("wrong");
        $("#level-title").text("Game Over");
        $("h1").css("margin-bottom",'35px');
        $("h2").text("Press any key to Restart");
        console.log("wrong");
        startOver();
    }
    
}

function startOver(){
    level=1;
    gamePattern=[];
    gameStarted = false;
    
}