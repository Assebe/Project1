/**  @type {HTMLCanvasElement} */ 

const canvas = document.getElementById("canvas")
const ctx  = canvas.getContext("2d");

const startButton = document.getElementById("startButton")

startButton.onclick = function(){
    const game = new Game(ctx, canvas.width, canvas.height, player)
    game.start()
}