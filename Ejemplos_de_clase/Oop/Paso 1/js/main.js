let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

clearCanvas();

let circlePosX = Math.round(Math.random() * canvasWidth);
let circlePosY = Math.round(Math.random() * canvasHeight);
let circleColor = randomRGBA();
let circleRadius = 20;

context.fillStyle = circleColor;
context.beginPath();
context.arc(circlePosX, circlePosY, circleRadius, 0, 2 * Math.PI);
context.fill();
context.closePath();

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