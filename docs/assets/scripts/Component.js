/**  @type {HTMLCanvasElement} */ 

class Component{
    constructor(x, y, w, h, ctx){
    this.x= x
    this.y= y   
    this.w= w
    this.h= h
    this.ctx= ctx
    this.speedX = 0
    /* this.speedY = 0  */
    }

    draw(){

    }

    newPos(){
        this.x += this.speedX;
       /*  this.y += this.speedY; */
    }

}