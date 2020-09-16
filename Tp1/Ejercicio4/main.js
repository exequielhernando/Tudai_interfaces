let canvas  = document.querySelector("#canvas");
let context = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let imageData = context.createImageData(width, height);
let r = 0;
let g = 0;
let b = 0;
let a = 255;

const setPixel = (imageData, x, y, r, g, b, a) => {
    let index = ( x + y * width) * 4;
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}
const drawRect = (imageData, r, g, b, a) => {
    for (let x = 0; x < width; x++) { 
        for (let y = 0; y < height; y++) {
            let r;
            let g;
            let b;
            let coeficiente = (255/width);
            r = coeficiente * y;
            g = coeficiente * y;
            b = coeficiente * y;
            
            
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
}

drawRect(imageData,r, g, b, a);
context.putImageData(imageData, 0, 0);
