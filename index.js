//Variable diclaration.
var buttonColours  = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



$(".btn").on("click" , function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);


});



$(document).keydown(function() {
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;

    }
  });
    

/////////////////////////////////////////////////////////////////////////
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

/////////////////////////////////////////////////////////////////////////
function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
    
    } else {
  
        // console.log("wrong");

        restartGame();
        gameOver();  

        $(document).keydown(function() {
            if (!started) {

                level = 0;
                $("#level-title").text("Level " + level);
                nextSequence();
                started = true;
        
            }
          });
  
      }
  
}
/////////////////////////////////////////////////////////////////////////
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
/////////////////////////////////////////////////////////////////////////
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);

}
/////////////////////////////////////////////////////////////////////////
function restartGame(){
    
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];

}
/////////////////////////////////////////////////////////////////////////
function gameOver(){
    
    $("#level-title").text("Game Over, Press Any Key To Start ");

    $("body").addClass("redFlash");
    setTimeout(function () {
        $("body").removeClass("redFlash");
    }, 300);

    playSound("wrong");

}