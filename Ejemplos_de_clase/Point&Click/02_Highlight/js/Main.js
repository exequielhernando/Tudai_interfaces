let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

const NUM_FIGURES = 4;
const FIGURE_SIZE = 40;

let figures = [];
let lastClickedFigure = null;

function addRectangle() {
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = randomRGBA();
    let rect = new Rect(posX, posY, FIGURE_SIZE, FIGURE_SIZE, color, context);
    figures.push(rect);
}

function addCircle() {
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = randomRGBA();
    let circle = new Circle(posX, posY, FIGURE_SIZE/2, color, context);
    figures.push(circle);
}

function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

function findClickedFigure(x, y) {
    for (let index = 0; index < figures.length; index++) {
        const element = figures[index];
        if (element.isPointInside(x, y)) {
            return element;
        }        
    }
}

function initExample() {
    // Inicializar figuras de forma aleatoria
    for (let index = 0; index < NUM_FIGURES; index++) {
        if (Math.random() > 0.5) {
            addRectangle();
        } else {
            addCircle();
        }
    }

    //dibujar figuras
    drawFigures();

    // Inicializar listeners
    canvas.addEventListener('click', event => {
        // Se limpia la propiedad highlighted de la ultima figura clickedad para buscar la nueva
        if (lastClickedFigure != null) {
            lastClickedFigure.setHighlighted(false);
            lastClickedFigure = null;
        }

        let clickedFigure = findClickedFigure(event.layerX, event.layerY);
        if (clickedFigure != null) {         
            clickedFigure.setHighlighted(true);
            lastClickedFigure = clickedFigure;            
        }
        
        drawFigures();
    });

}

initExample();