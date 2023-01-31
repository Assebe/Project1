/**  @type {HTMLCanvasElement} */ 

const canvas = document.getElementById("canvas")
const ctx  = canvas.getContext("2d");

const startButton = document.getElementById("startButton")
const chooseDifficulty = document.getElementById("chooseDifficultyButton")
/* const easy = */

const player = new Component(10, 500 - 45, 40, 40, "Image", ctx)


startButton.onclick = function () {
    const gameEasy = new GameEasy(ctx, canvas.width, canvas.height, player); 
    gameEasy.start();
    startButton.style.display = "none"
    canvas.classList.remove("hidden")
  };

chooseDifficulty.onclick = function () {
  chooseDifficulty.style.display = "none"
  document.getElementById("easyButton").classList.remove("hidden")
  document.getElementById("hardButton").classList.remove("hidden")
  startButton.classList.add("hidden")
}
  
document.addEventListener("keydown", (e) => {
    switch(e.code){
    
        case "ArrowUp":
        if (player.y > 25) {
            player.speedY -= 0.5;
          } else {
            player.speedY = 0;
          }
          break;
    
        case "ArrowDown": player.speedY += 1; break;

    }
    })
document.addEventListener("keyup", (e) =>{
        player.speedY = 0
    })

