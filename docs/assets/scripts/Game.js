/**  @type {HTMLCanvasElement} */ 
class Game{
    constructor(ctx, width, height, player){
        this.ctx = ctx
        this.width = width
        this.height = height
        this.player = player
        this.isIntervalID = null;
        this.frames = 0;

 }
 start(){
    this.isIntervalID = setInterval(this.update, 1000/60)
    }

 update = () => {
       
    }
}