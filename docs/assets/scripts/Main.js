/**  @type {HTMLCanvasElement} */ 

const canvas = document.getElementById("canvas")
const ctx  = canvas.getContext("2d");

const startButton = document.getElementById("startButton")
const chooseDifficulty = document.getElementById("chooseDifficultyButton")
const restartEasy = document.getElementById("restartEasyButton")
const restartHard = document.getElementById("restartHardButton")
const instructions = document.getElementById("instructions")
const winningGif = document.getElementById("winning-gif") 
const loosingGif = document.getElementById("loosing-gif") 

const player = new Component(10, 500 - 45, 50, 60, "Image", ctx)


startButton.onclick = function () {
    const gameEasy = new GameEasy(ctx, canvas.width, canvas.height, player); 
    gameEasy.start();
    startButton.style.display = "none"
    chooseDifficulty.style.display = "none"
    canvas.classList.remove("hidden")
  };

chooseDifficulty.onclick = function () {
  chooseDifficulty.style.display = "none"
  document.getElementById("easyButton").classList.remove("hidden")
  document.getElementById("hardButton").classList.remove("hidden")
  startButton.classList.add("hidden")
}

easyButton.onclick = function () {
  const gameEasy = new GameEasy(ctx, canvas.width, canvas.height, player); 
      gameEasy.start();
    easyButton.style.display = "none"
    hardButton.style.display = "none"
    canvas.classList.remove("hidden")
  };

  hardButton.onclick = function () {
    const gameHard = new GameHard(ctx, canvas.width, canvas.height, player); 
      gameHard.start();
      easyButton.style.display = "none"
      hardButton.style.display = "none"
    canvas.classList.remove("hidden")
    };

 restartEasy.onclick = function () { 
  document.location.reload();
}

restartHard.onclick = function () {
  document.location.reload();
}
  

  
document.addEventListener("keydown", (e) => {
    switch(e.code){
    
        case "ArrowUp":
        if (player.y > 15) {
            player.speedY -= 0.5;
          } else player.speedY = 0;
           
          break;
    
        case "ArrowDown":
        if(player.y < 540) {
        player.speedY += 0.5;}
        else player.speedY = 0;
         break;

    }
    })
document.addEventListener("keyup", (e) =>{
        player.speedY = 0
    })

