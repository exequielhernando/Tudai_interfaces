
let ctx = document.querySelector("#canvas").getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(250,25,150,100);
ctx.beginPath();
ctx.arc(450, 110, 100, Math.PI * 1/2, Math.PI * 3/2);
ctx.lineWidth = 15;
ctx.lineCap = "round";
ctx.strokeStyle = "rgba(255, 127, 0, 0.5)";
ctx.stroke();
