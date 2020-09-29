let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figures = [];

//Limpia el canvas
const clearCanvas = () => {
    context.fillStyle = '#F8F8FF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}
//Elige un color al azar rgba
const randomRGBA = () => {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
//Elige una posicion al azar en el canvas
const getPosRamdom = () => {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    return{
        posX: posX,
        posY: posY
    };
}
//Agrega un rectangulo
const addRectangle = () => {
    let rectWidth = 20;
    let rectHeight = 20;
    let posX = getPosRamdom().posX;
    let posY = getPosRamdom().posY;
    let color = randomRGBA();
    let rect = new Rect(posX, posY, color, context, rectWidth, rectHeight);
    figures.push(rect);
}
//Agrega un circulo
const addCircle = () => {
    let radius = 10;
    let posX = getPosRamdom().posX;
    let posY = getPosRamdom().posY;
    let color = randomRGBA();
    let circle = new Circle(posX, posY, color, context, radius);
    figures.push(circle)
}
//Dibuja una figura
const drawFigures = () => {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();        
    }
}
// Agrega figuras al azar
const addFigure = () => {
    if  (Math.random() > 0.5){
        addRectangle();
    }   else {
        addCircle();
    }
    drawFigures();
}

//Evento para agregar figuras por un tiempo determinado
const addFigures = () => {
    let sizeArray = 30;
    let frequency = 333;
    addFigure();
    if  (figures.length < sizeArray){
        setTimeout(addFigures, frequency);
    }
}
addFigures();