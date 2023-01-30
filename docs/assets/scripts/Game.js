/**  @type {HTMLCanvasElement} */ 
class Game{
    constructor(ctx, width, height, player){
        this.ctx = ctx
        this.width = width
        this.height = height
        this.player = player
        this.isIntervalID = null;
        this.frames = 0;
        this.enemies = []
        this.backgroundImage = new Image();

 }
 start(){
    this.isIntervalID = setInterval(this.update, 1000/60)
    }

 update = () => {
    this.frames++;
    this.clear();
    this.player.newPos();
    this.player.draw();
    this.updateEnemies();
    this.checkColision()
    this.checkGameOver();
    }

    stop() {
        clearInterval(this.intervalId);
      }

      clear(){
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
          this.enemies[i].x -= 1;
          this.enemies[i].draw();
        }
    
        if (this.frames % 200 === 0) {
          let randomSize = Math.floor(Math.random() * (100 - 50) + 150);
    
          let randomY = Math.floor(Math.random() * (200 - 100) + 100);
    
          this.enemies.push(new Enemy(1200, randomY, randomSize, 50, "red", this.ctx));
        }
      }
    checkColision() {
        const crashed = this.enemies.some((enemy) => {
          return this.player.crashWith(enemy);
        });
    
        if (crashed) {
          ctx.fillStyle = "black";
          ctx.fillRect(50, 200, 400, 250);
          ctx.font = "32px Helvetica";
          ctx.fillStyle = "red";
          ctx.fillText(`Colision`, 150, 300);
          ctx.fillStyle = "white";
        }
      }
    
      checkGameOver(){
        const timeRunout = this.frames> 5000
      }
      if (timeRunout) {
        ctx.font = "32px Verdana";
        ctx.fillStyle = "red";
        ctx.fillText(`Game Over :(  Time ran out`, 150, 300);
        this.stop()
      }
}
