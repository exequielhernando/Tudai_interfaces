let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// --------------------------------------------------------------

function AddCircle(posX, posY, radius, color) {
    figures.push({
        posX, posY, radius, color
    });
}

let figures = [];

clearCanvas();

AddCircle(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 20, randomRGBA());
AddCircle(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 20, randomRGBA());
AddCircle(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 20, randomRGBA());

// Dibujo los circulos
for (let index = 0; index < figures.length; index++) {
    let figure = figures[index];
    context.fillStyle = figure.color;
    context.beginPath();
    context.arc(figure.posX, figure.posY, figure.radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();    
}

// ---------------------------------------------------------------

function clearCanvas() {
    context.fillStyle = '#F8F8FF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}