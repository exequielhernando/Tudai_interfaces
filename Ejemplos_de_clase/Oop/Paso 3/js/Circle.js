class Circle {
    constructor(posX, posY, radius, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.radius = radius;
        this.context = context;
    }

    draw() {
        this.context.fillStyle = this.fill;
        
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    getRadius() {
        return this.radius;
    }
}