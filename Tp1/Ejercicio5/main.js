let canvas  = document.querySelector("#canvas");
let context = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let imageData = context.createImageData(width, height);
let ratio = 255 / (height/2);
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
const drawRect = (imageData, ratio, r, g, b, a) => {
    for (let x = 0; x < width; x++) { 
        for (let y = 0; y < height; y++) {
            if (y <= height/2) {
                r += ratio;
                g += ratio;
            } 
            if(y > height/2) {
                g -= ratio;
            }
            setPixel(imageData, x, y, r, g, b, a);
            
        }
        r = 0;
        g = 0;
        b = 0;
    }
}

drawRect(imageData,ratio, r, g, b, a);
context.putImageData(imageData, 0, 0);
