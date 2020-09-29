class Token{
    constructor(x, y, param, player){
        this.x = x;
        this.y = y;
        this.radio = 25;
        this.player = player;
        this.status = '';
        this.highlighted = false;
        this.image = new Image();
        this.getTokekImage(param)
    }

    getTokekImage(param) {
        if(param === 'p1')
            this.image.src = './images/ficha1.png';
        else if (param === 'p2')
            this.image.src = 'images/ficha2.png';
        else if (param === 'empty')
            this.image.src = './images/ficha-vacia.png';
    }

    getPlayer(){
        if (this.player === 0)
            return this.player;
        else 
            return this.player.getPlayerNumber();
    }

    getName() {
        return this.player.getName();
    }

    getStatus() {
        return this.status;
    }

    setContext(context){
        this.context = context;
    }
    setHighlighted(value) {
        this.highlighted = value;
    }
    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setColor(param){
        this.param = param;
    }

    setStatus(status) {
        this.status = status;
    }

    isClicked(x, y) {
        var xLayer = x - this.x;
        var yLayer = y - this.y;
        return Math.sqrt(xLayer*xLayer + yLayer*yLayer) < this.radio;
    }

    draw(){
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radio, 0, Math.PI*2);
        this.context.fillStyle = '#ffffff';
        this.context.fill();
        if (this.highlighted === true) {
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 5;
            this.context.stroke();
        }
       
        this.context.drawImage(this.image, this.x - this.radio - 6, this.y - this.radio - 6);
        this.context.closePath();
        this.image.onload = () => {
        };
    }
}
	