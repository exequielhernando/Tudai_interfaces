"use strict"
window.addEventListener("load", () =>{

    //start variables
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');
    let newFile = document.querySelector("#newFile");
    let pencil = document.querySelector("#pencil");
    let eraser = document.querySelector("#eraser");
    let drawing = false;
    let erasing = false;

    // clear canvas
    const newCanvas = () => {
        context.fillStyle = "#fff"; // canvas background color
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
    }
   
    //Mouse events
    const mouseEvents = () => {
        canvas.addEventListener("mousedown", startDraw, false);
        canvas.addEventListener("mouseup", finishDraw, false);
        canvas.addEventListener("mousemove", drawLine, false);
    }
    //Begin to draw
    const startDraw = e => {
        drawing = true;
        drawLine(e);
    }
    //Finish to draw
    const finishDraw = () => {
        drawing = false;
        context.beginPath();
    }
    //Draw a line
    const drawLine = e => {
        e.preventDefault();
        if (erasing) context.strokeStyle = "#fff";
        if (drawing) {
            // Estilos de linea
            context.lineJoin = context.lineCap = 'round';
            context.lineWidth = document.querySelector("#pencil-size").value;
            // Redibuja todas las lineas guardadas
            context.beginPath();
            context.moveTo(e.layerX, e.layerY);
            context.lineTo(e.layerX, e.layerY);
            context.stroke();
            
        }
       
    }
    // Enable pencil to draw
    const enablePencil = () => {
        context.strokeStyle = "#000";
        context.lineCap = "round";
        erasing = false;
        mouseEvents();
    }
    //Enable eraser to erase
    const enableEraser = () => {
        context.strokeStyle = "#fff";
        context.lineCap = "round";
        erasing = true;
        mouseEvents();
    }
    
    //Event Listeners
    newFile.addEventListener("click", newCanvas);
    pencil.addEventListener("click", enablePencil);
    eraser.addEventListener("click", enableEraser);

})