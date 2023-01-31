/**  @type {HTMLCanvasElement} */ 

const canvas = document.getElementById("canvas")
const ctx  = canvas.getContext("2d");

const startButton = document.getElementById("startButton")

const player = new Component(10, canvas.height/2 - 45, 75, 75, "red", ctx)

startButton.onclick = function(){
    const game = new Game(ctx, canvas.width, canvas.height, player)
    game.start()
}

document.addEventListener("keydown", (e) => {
    switch(e.code){
    
        case "ArrowUp": player.speedY -= 1; break;
    
        case "ArrowDown": player.speedY += 1; break;

    }

    
    })