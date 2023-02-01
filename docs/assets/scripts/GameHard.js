/**  @type {HTMLCanvasElement} */ 
class GameHard{
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
      this.timer = 50;
      this.background = new Image ()
      this.scrollX = 0
      const img1 = new Image();
      const img2 = new Image();
      const img3 = new Image();
      img1.src = "../docs/assets/images/Enemies/Ash-NoBg.png";
      img2.src = "../docs/assets/images/Enemies/ashFriend-NoBg.png";
      img3.src = "../docs/assets/images/Enemies/Doc-NoBg.png";
      this.images5 = [img1, img2, img3]
    }


start(){
  this.isIntervalID = setInterval(this.update, 1000/60)
  }

  update = () => {
    this.frames++;

    if (this.scrollX >= -525){
    this.scrollX -= 0.1} 
    this.clear(); 
    this.player.newPos();
    this.player.draw();
    this.updateEnemies();
    this.updateVerticalEnemiesUp();
    this.updateVerticalEnemiesDown();
    this.updateBonusItems();
    this.checkColision();
    this.checkColisionUp();
    this.checkColisionDown();
    this.checkIfTouched()
    this.checkGameWon();
    this.checkGameOver();
    this.drawTimer();
    this.updateTimer();
  }
   
  drawTimer() {
    ctx.font = "45px rainyhearts";
    ctx.fillStyle = "limegreen"
    ctx.fillText(`METRO LEAVES IN: ${this.timer} SEC`, 70, 55);
  }

  updateTimer() {
    if (this.frames % 60 === 0) {
      this.timer--;
    }
  }

stop() {
      clearInterval(this.isIntervalID)
    }

clear(){    
     this.background.src = "../docs/assets/images/metro.png"
      this.ctx.drawImage(this.background, this.scrollX, 0, 1725, 600) 
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].x -= 3;
      this.enemies[i].draw();
    }

    if (this.frames % 80 == 0) {

      let randomY = Math.floor(Math.random() * (600 - 50) + 50);
      let randomImg = this.images5[Math.floor(Math.random() * this.images5.length)]
      
      this.enemies.push(new Enemy(randomImg, 1200, randomY, 40, 60, this.ctx));
    }
  }
  updateVerticalEnemiesUp() {
    for (let i = 0; i < this.verticalEnemiesUp.length; i++) {
      this.verticalEnemiesUp[i].x -= 3;
      this.verticalEnemiesUp[i].y += 0.5;
      this.verticalEnemiesUp[i].draw();
    }

    if (this.frames % 80 === 0) {
      let randomImg = this.images5[Math.floor(Math.random() * this.images5.length)]
      let randomY = Math.floor(Math.random() * (600 - 50) + 50);
      this.verticalEnemiesUp.push(new Enemy(randomImg, 1200, randomY, 40, 60, this.ctx));
      
    }
  }

  updateVerticalEnemiesDown() {
    for (let i = 0; i < this.verticalEnemiesDown.length; i++) {
      this.verticalEnemiesDown[i].x -= 3;
      this.verticalEnemiesDown[i].y -= 0.5;
      this.verticalEnemiesDown[i].draw();
    }

    if (this.frames % 80 === 0) {
      let randomImg = this.images5[Math.floor(Math.random() * this.images5.length)]
      let randomY = Math.floor(Math.random() * (600 - 50) + 50);
      this.verticalEnemiesDown.push(new Enemy(randomImg, 1200, randomY, 40, 60, this.ctx));
    }
  }

updateBonusItems() {
      for (let i = 0; i < this.bonusItems.length; i++) {
        this.bonusItems[i].x -= 1;
        this.bonusItems[i].draw();
      }
  
      if (this.frames % 1000 === 0) {
  
        let randomY = Math.floor(Math.random() * (600 - 100) + 100);
  
        this.bonusItems.push(new BonusItem(1200, randomY, 40, 40, this.ctx));
      }
    }

checkColision() {
      const crashedEnemies = this.enemies.some((enemy) => {
        return this.player.crashWith(enemy);
      })
      if (crashedEnemies && this.player.x >= 20) {

        this.player.x -= 10
      
      }
    }

    checkColisionUp() {
          const crashedEnemiesUp = this.verticalEnemiesUp.some((enemy) => {
            return this.player.crashWith(enemy);
          })
          if (crashedEnemiesUp && this.player.x >= 20) {
            this.player.x -= 10
          
          }
        }
        checkColisionDown() {
              const crashedEnemiesDown = this.verticalEnemiesDown.some((enemy) => {
                return this.player.crashWith(enemy);
              })
              if (crashedEnemiesDown && this.player.x >= 20) {
                this.player.x -= 10
              
              }
            }
  
checkIfTouched(){
  const touched = this.bonusItems.some((bonusItem) => {
      return this.player.touchBonus(bonusItem);
  })
  if(touched){
      this.player.speedX += 0.05
    setTimeout(() => this.player.speedX = 0.5, 2000)

  }
}

checkGameWon(){
  if(this.player.x >= canvas.width-30){
   ctx.fillStyle = "black";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   ctx.font = "50px Courier New";
   ctx.fillStyle = "limegreen";
   ctx.fillText(`You made it!`, canvas.width/2 -100, canvas.height/2);
   this.stop()
  }
}

checkGameOver(){
   if (this.frames >= 3000){
   ctx.fillStyle = "black";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   ctx.font = "50px Courier New";
   ctx.fillStyle = "limegreen";
   ctx.fillText(`The train left without you...`, canvas.width/2 -100, canvas.height/2);
   this.stop()
      }
}
}
