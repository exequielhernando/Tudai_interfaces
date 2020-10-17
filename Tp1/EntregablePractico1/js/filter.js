"use strict";
window.addEventListener("load", () =>{
    let canvas = document.querySelector("#canvas");
    let context = canvas.getContext('2d');

    let sepia = document.querySelector("#sepia");
    let negative = document.querySelector("#negative"); 
    let light = document.querySelector("#light");
    let greyScale = document.querySelector("#grey-scale");
    let binary = document.querySelector("#binary");
    let red = 0;
    let green = 0;
    let blue = 0;
    let midleColor = (255*3/2);
    let openFile = document.querySelector("#openFile");
    let downloadFile = document.querySelector("#downloadFile");

     //Download image
     const downloadImage = () => {
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        downloadFile.setAttribute("href", image);
    }

    //Event Listeners
    downloadFile.addEventListener("click", downloadImage);
    
    // when click OK in the File Dialog
    openFile.addEventListener("change", e => {
    
        // getting a hold of the file reference
        let file = e.target.files[0];

        // setting up the reader
        let reader = new FileReader();
        reader.readAsDataURL(file); // this is reading as data url

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            let content = readerEvent.target.result; // this is the content!

            let image = new Image();
            //image.crossOrigin = 'Anonymous';

            image.src = content;

            image.onload = function () {

                let imageAspectRatio = (1.0 * this.height) / this.width;
                let imageScaledWidth;
                let imageScaledHeight;
                if (this.width > this.height) {
                    imageScaledWidth= canvas.height;
                    imageScaledHeight= canvas.height * imageAspectRatio;
                }else{
                    imageScaledWidth= canvas.width;
                    imageScaledHeight= canvas.width * imageAspectRatio;
                }
                // draw image on canvas
                context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

                // get imageData from content of canvas
                let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                
                // draw the modified image
                context.putImageData(imageData, 0, 0);
            }
        }
    });
    const  getPixel = (imageData, x, y, pos) => {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + pos];
    }
    const setPixel = (imageData, x, y, r, g, b) => {
        let index = ( x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
    }
    const rgbToHsl = (r, g, b) => {
        (r /= 255), (g /= 255), (b /= 255);
        let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
        let h = (max + min) / 2;
        let s = (max + min) / 2;
        let l = (max + min) / 2;
        if (max == min) {
          h = s = 0;
        } else {
          let d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
      }
      return [h, s, l];
    }
    const hslToRgb = (h, s, l)=> {
      let r, g, b;
      if (s == 0) {
        r = g = b = l;
      } else {
        function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return [r * 255, g * 255, b * 255];
    }
    const sepiaFilter = () => {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let r = 0.393 * getPixel(imageData, x, y, red) + 0.769 * getPixel(imageData, x, y, green) + 0.189 * getPixel(imageData, x, y, blue);
                if (r > 255) r = 255;
                let g = 0.349 * getPixel(imageData, x, y, red) + 0.686 * getPixel(imageData, x, y, green) + 0.168 * getPixel(imageData, x, y, blue);
                if (g > 255) g = 255;

                let b = 0.272 * getPixel(imageData, x, y, red) + 0.534 * getPixel(imageData, x, y, green) + 0.131 * getPixel(imageData, x, y, blue);
                if (b > 255) b = 255;

                setPixel(imageData, x, y, r, g, b);
            }
        }
        context.putImageData(imageData, 0, 0);
    }
    const negativeFilter = () => {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            setPixel(imageData,x,y, 255 - getPixel(imageData, x, y, red),255 - getPixel(imageData, x, y, green),255 - getPixel(imageData, x, y, blue));
          }
        }
        context.putImageData(imageData, 0, 0);
    }
    const averagePixel = (x , y, imageData) => {
        let greyPixel;
        let r,g,b;
        r = getPixel(imageData, x, y, red);  
        g = getPixel(imageData, x, y, green);
        b = getPixel(imageData, x, y, blue);
        greyPixel = (r + g + b) / 3;
        return greyPixel;
    }
    const greyFilter = () => {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            let greyPixel = averagePixel(x, y, imageData);
            setPixel(imageData, x, y, greyPixel, greyPixel, greyPixel);
          }
        }
        context.putImageData(imageData, 0, 0);
      }
      const binaryFilter = () => {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            let pixel = getPixel(imageData, x, y, red) + getPixel(imageData, x, y, green) + getPixel(imageData, x, y, blue);
            if (pixel > midleColor) {
              setPixel(imageData, x, y, 255, 255, 255);
            } else {
              setPixel(imageData, x, y, 0, 0, 0);
            }
          }
        }
        context.putImageData(imageData, 0, 0);
      }
      const HSLFilter = (option, value) => {
        console.log(option, value);
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < imageData.width; x++) {
          for (let y = 0; y < imageData.height; y++) {
            let hsl = rgbToHsl( getPixel(imageData, x, y, red), getPixel(imageData, x, y, green), getPixel(imageData, x, y, blue));
            hsl[option] = hsl[option] * value;
            
            let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
            setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2]);
          }
        }
        context.putImageData(imageData, 0, 0);
      }
    //Event Listener
    sepia.addEventListener("click", sepiaFilter);
    negative.addEventListener("click", negativeFilter);
    greyScale.addEventListener("click", greyFilter);
    binary.addEventListener("click", binaryFilter);
    light.addEventListener("click", () =>{
      let lightValue = document.querySelector("#light-value").value;
      HSLFilter(1,lightValue)
    });
});