const maxRows = 100;
const maxCols = 100;
const matrixConteiner = document.querySelector("#matrix");
const maxValueConteiner = document.querySelector("#maxValue");
const maxValueEvenConteiner = document.querySelector("#maxValueEven");
const minValueOddConteiner = document.querySelector("#minValueOdd");
const averageConteiner = document.querySelector("#average");
let matrix = [];

const getRandom = () => {
    return Math.floor(Math.random() * 100);
}

const createMatrix = () => {
    for (let i = 0; i < maxRows; i++) {
        matrix [i] = [];
        for (let j = 0; j < maxCols; j++) {
            matrix[i][j] = getRandom ();
        }
    }
}
const getMaxValue = () => {
    let maxValue = -1;
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols; j++) {
            if (matrix[i][j] > maxValue) {
                maxValue = matrix[i][j];
            }
        }
    }
    return maxValue;
}
const getMaxEvenValueRows = () => {
    let maxValue = -1;
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols; j++) {
            if(i%2 == 0){
                if (matrix[i][j] > maxValue) {
                    maxValue = matrix[i][j];
                }
            }
        }
        
    }
    return maxValue;
}
const getMinOddValueRows = () => {
    let minValue = 101;
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols; j++) {
            if(i%2 != 0){
                if (matrix[i][j] < minValue) {
                    minValue = matrix[i][j];
                }
            }
        }
        
    }
    return minValue;
}
const getAverageRow = () => {
    let averageArray = [];
    let sum = 0;
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols; j++) {
            sum += matrix[i][j];
        }
        averageArray[i] = sum/maxCols;
    }
    return averageArray;
}
const printMatrix  = () => {
    let content = '';
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols; j++) {
            content += ` ${matrix[i][j]}| `;
        }
        content += `<br>`;
    }
    matrixConteiner.innerHTML = content;
}
const printMaxValue = () => {
    maxValueConteiner.innerHTML = getMaxValue();
}
const printMaxEvenValuerows = () => {
    maxValueEvenConteiner.innerHTML = getMaxEvenValueRows();
}
const printMinOddValueRows = () => {
    minValueOddConteiner.innerHTML = getMinOddValueRows();
}
const printAverageRow = () => {
    let content = ``;
    let averageArray = getAverageRow();
    for (let i = 0; i < averageArray.length; i++) {
        content += `Fila ${i + 1}: ${averageArray[i]} `;
        content += `<br>`;       
    }
    averageConteiner.innerHTML = content;
}
createMatrix();
printMatrix();
printMaxValue();
printMaxEvenValuerows();
printMinOddValueRows();
printAverageRow();