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
        this.verticalEnemies = []
        this.bonusItems = []
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
    this.updateVerticalEnemies();
    this.updateBonusItems();
    this.checkColision();
    this.checkGameWon();
    this.checkGameOver();
    }

 stop() {
        clearInterval(this.isIntervalID)
      }

 clear(){
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

  updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
          this.enemies[i].x -= 3;
          this.enemies[i].draw();
        }
    
        if (this.frames % 0 === 0) {
    
          let randomY = Math.floor(Math.random() * (600 - 50) + 50);
    
          this.enemies.push(new Enemy(1200, randomY, 40, 40, "green", this.ctx));
        }
      }

      updateVerticalEnemies() {
        for (let i = 0; i < this.verticalEnemies.length; i++) {
          this.verticalEnemies[i].x -= 3;
          this.verticalEnemies[i].y -= 0.5;
          this.verticalEnemies[i].draw();
        }
    
        if (this.frames % 70 === 0) {
    
          let randomY = Math.floor(Math.random() * (600 - 50) + 50);
          this.verticalEnemies.push(new Enemy(1200, randomY, 40, 40, "green", this.ctx));
        }
      }

  updateBonusItems() {
        for (let i = 0; i < this.bonusItems.length; i++) {
          this.bonusItems[i].x -= 1;
          this.bonusItems[i].draw();
        }
    
        if (this.frames % 1000 === 0) {
    
          let randomY = Math.floor(Math.random() * (600 - 100) + 100);
    
          this.bonusItems.push(new BonusItem(1200, randomY, 30, 20, "yellow", this.ctx));
        }
      }

  checkColision() {
        const crashedEnemies = this.enemies.some((enemy) => {
          return this.player.crashWith(enemy);
        });
    
        if (crashedEnemies) {
          this.stop()
        }
      }
    

  checkGameWon(){
    if(this.player.x >= canvas.width){
     ctx.font = "32px Verdana";
     ctx.fillStyle = "red";
     ctx.fillText(`You made it!`, canvas.width/2 -100, canvas.height/2);
     this.stop()
    }
  }

  checkGameOver(){
     if (this.frames >= 3600){
     ctx.font = "32px Verdana";
     ctx.fillStyle = "red";
     ctx.fillText(`Game Over, train left :(`, canvas.width/2 -100, canvas.height/2);
     this.stop()
        }
}

checkifTouched(){
  const touched = this.bonusItems.some((bonusItem) => {
      return this.player.touchBonus(bonusItem);
  })
  if(touched){
      setInterval(this.player.speedX += 0.1, 4000)
      setInterval(this.player.speedY += 0.1, 4000)
  }
}
}
