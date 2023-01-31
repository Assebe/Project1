/**  @type {HTMLCanvasElement} */ 

const canvas = document.getElementById("canvas")
const ctx  = canvas.getContext("2d");
/* ------------------------------ */



/* --------------------- */

const startButton = document.getElementById("startButton")

const player = new Component(10, canvas.height/2 - 45, 40, 40, "red", ctx)

startButton.onclick = function () {
    const game = new Game(ctx, canvas.width, canvas.height, player);
    game.start();
  };
  
document.addEventListener("keydown", (e) => {
    switch(e.code){
    
        case "ArrowUp":
        if (player.y > 25) {
            player.speedY -= 0.5;
          } else {
            player.speedY = 0;
          }
          break;
    
        case "ArrowDown": 
        if (player.y + player.speedY < canvas.height -85){
        player.speedY += 0.2;
        } else {
        player.speedY = 0;
        }
        break;
        }
    })
document.addEventListener("keyup", (e) =>{
        player.speedY = 0
    })
