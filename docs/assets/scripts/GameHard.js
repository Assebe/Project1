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
      this.timer = 60;
      this.background = new Image ()
      this.scrollX = 0
      const img1 = new Image();
      const img2 = new Image();
      const img3 = new Image();
      img1.src = "docs/assets/images/Enemies/Ash-NoBg.png";
      img2.src = "docs/assets/images/Enemies/ashFriend-NoBg.png";
      img3.src = "docs/assets/images/Enemies/Doc-NoBg.png";
      this.images5 = [img1, img2, img3]
      this.isIntervalSpriteID
    }


start(){
  this.isIntervalID = setInterval(this.update, 1000/60)
  this.isIntervalSpriteID = setInterval(this.updateSprite, 1000/15)
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
    ctx.font = "45px VT323";
    ctx.fillStyle = "limegreen"
    ctx.fillText(`METRO LEAVES IN: ${this.timer} SEC`, 70, 55);
  }

  updateTimer() {
    if (this.frames % 60 === 0) {
      this.timer--;
    }
  }

  updateSprite = () => { // update just for the sprite so it runs slower than if it was inside the update() 
    if (this.player.dx > 415){
      this.player.dx = 0
    }
    else {
      this.player.dx += 63
    }
  }

stop() {
      clearInterval(this.isIntervalID)
    }

clear(){    
     this.background.src = "docs/assets/images/metro.png"
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

    if (this.frames % 1100 === 0) {

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
          
          
                  
                  for (let i =0; i < this.bonusItems.length; i++){
                           setTimeout(() => this.bonusItems.splice(i,1) , 500)}
            }
          }

checkGameWon(){
  if(this.player.x >= canvas.width-30){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px VT323";
    ctx.fillStyle = "limegreen";
    ctx.fillText(`You caught the Metro! You'll make it on time to IronClass!`, 120, canvas.height/3.2);
     this.stop()
     restartEasy.classList.remove("hidden")
     winningGif.style.display="inline"
  }
}

checkGameOver(){
   if (this.frames >= 3050){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px VT323";
    ctx.fillStyle = "red";
    ctx.fillText(`💀 The Metro left without you, you'll be late for IronClass! 💀`, 90, canvas.height/3.2);
   this.stop()
   restartHard.classList.remove("hidden")
   loosingGif.style.display="inline"
      }
}
}
