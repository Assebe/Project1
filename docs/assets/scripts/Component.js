/**  @type {HTMLCanvasElement} */ 

class Component{
    constructor(x, y, w, h, color, ctx){
    this.x= x
    this.y= y   
    this.w= w
    this.h= h
    this.color = color
    this.ctx= ctx
    this.speedX = 0.45
    this.speedY = 0  
    this.img = new Image();
    this.img.src = "../docs/assets/images/playerSprite.png";
    this.dx = 0
    this.dy = 0
    
    }

    draw(){  
      this.ctx.drawImage(this.img, this.dx, this.dy, 63, 58, this.x, this.y, this.w, this.h) }
   

    newPos(){
       this.x += this.speedX;
       this.y += this.speedY;
    }

    top(){
        return this.y;
    }

    bottom(){
        return this.y + this.h;
    }

    left(){
        return this.x
    }
    right(){
        return this.x + this.w
    }

    crashWith (enemy){
        return !(
            this.bottom() < enemy.top() ||
            this.top() > enemy.bottom() ||
            this.right() < enemy.left() ||
            this.left() > enemy.right()
        );
    }

    touchBonus (bonusItem){
      return !(
          this.bottom() < bonusItem.top() ||
          this.top() > bonusItem.bottom() ||
          this.right() < bonusItem.left() ||
          this.left() > bonusItem.right()
      );
  }

}

class BonusItem{
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "../docs/assets/images/bonusItems/redBullPixel.png";
  }



  draw(){
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    top(){
      return this.y;
  }

  bottom(){
      return this.y + this.h;
  }

  left(){
      return this.x
  }
  right(){
      return this.x + this.w
  }

}


class Enemy {
    constructor(img, x, y, w, h, ctx) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.ctx = ctx;
      this.speedX = 0;
      this.speedY = 0;
      this.img = img
    }
  
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
  
  top(){
      return this.y;
  }

  bottom(){
      return this.y + this.h;
  }

  left(){
      return this.x
  }
  right(){
      return this.x + this.w
  }
  }