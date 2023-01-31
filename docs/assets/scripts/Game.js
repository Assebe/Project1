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
        this.verticalEnemiesUp = []
        this.verticalEnemiesDown = []
        this.bonusItems = []
        this.timer = 60;
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
    this.updateVerticalEnemiesUp();
    this.updateVerticalEnemiesDown();
    this.updateBonusItems();
    this.checkColision();
    this.checkIfTouched()
    this.checkGameWon();
    this.checkGameOver();
    this.drawTimer();
    this.updateTimer();
    this.animate()
    }

    animate(){
      ctx.drawImage(backgroundImage, 0, 0)
      requestAnimationFrame(animate);
  }
     
    drawTimer() {
      ctx.font = "45px rainyhearts";
      ctx.fillStyle = "white"
      ctx.fillText(`METRO LEAVES IN: ${this.timer} SEC`, 80, 30);
    }
  
    updateTimer() {
      if (this.frames % 40 === 0) {
        this.timer--;
      }
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
    
        if (this.frames % 100 == 0) {
    
          let randomY = Math.floor(Math.random() * (600 - 50) + 50);
    
          this.enemies.push(new Enemy(1200, randomY, 40, 40, "green", this.ctx));
        }
      }

      updateVerticalEnemiesUp() {
        for (let i = 0; i < this.verticalEnemiesUp.length; i++) {
          this.verticalEnemiesUp[i].x -= 3;
          this.verticalEnemiesUp[i].y += 0.5;
          this.verticalEnemiesUp[i].draw();
        }
    
        if (this.frames % 100 === 0) {
    
          let randomY = Math.floor(Math.random() * (600 - 50) + 50);
          this.verticalEnemiesUp.push(new Enemy(1200, randomY, 40, 40, "green", this.ctx));
        }
      }

      updateVerticalEnemiesDown() {
        for (let i = 0; i < this.verticalEnemiesDown.length; i++) {
          this.verticalEnemiesDown[i].x -= 3;
          this.verticalEnemiesDown[i].y -= 0.5;
          this.verticalEnemiesDown[i].draw();
        }
    
        if (this.frames % 100 === 0) {
    
          let randomY = Math.floor(Math.random() * (600 - 50) + 50);
          this.verticalEnemiesDown.push(new Enemy(1200, randomY, 40, 40, "green", this.ctx));
        }
      }

  updateBonusItems() {
        for (let i = 0; i < this.bonusItems.length; i++) {
          this.bonusItems[i].x -= 1;
          this.bonusItems[i].draw();
        }
    
        if (this.frames % 1000 === 0) {
    
          let randomY = Math.floor(Math.random() * (600 - 100) + 100);
    
          this.bonusItems.push(new BonusItem(1200, randomY, 20, 20, "yellow", this.ctx));
        }
      }

  checkColision() {
        const crashedEnemies = this.enemies.some((enemy) => {
          return this.player.crashWith(enemy);
        })
        if (crashedEnemies) {

          setInterval(this.player.speedX -= 0.1, 1000)
        
        }
      }

      checkColisionUp() {
            const crashedEnemies = this.verticalEnemiesUp.some((enemy) => {
              return this.player.crashWith(enemy);
            })
            if (crashedEnemies) {
              this.player.speedX -= 0.1
            
            }
          }
          checkColisionDown() {
                const crashedEnemies = this.verticalEnemiesDown.some((enemy) => {
                  return this.player.crashWith(enemy);
                })
                if (crashedEnemies) {
                  this.player.speedX -= 0.1
                
                }
              }
    
  checkIfTouched(){
    const touched = this.bonusItems.some((bonusItem) => {
        return this.player.touchBonus(bonusItem);
    })
    if(touched){
        this.player.speedX += 0.1
        setTimeout(this.player.speedX -= 2, 2000 )
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

}
