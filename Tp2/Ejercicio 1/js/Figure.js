class Figure{
    constructor(posX, posY, fill, context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
    }
    setFill(fill){
        this.fill = fill;
    }
    getFill(){
        return this.fill;
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        };
    }
    draw(){
        this.context.fillStyle= this.fill;
    }
}