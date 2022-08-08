const gridContainer = document.querySelector(".grid-container");

const defaultSelectedColor = "rgb(10, 70, 110)";

const root = document.querySelector(':root');

const gridSizeSlider = document.querySelector("#grid-size-slider");
const gridSizeLabel= document.querySelector("#grid-size-label");
const resetButton = document.querySelector("#reset-button");
const clearButton = document.querySelector('#clear-button');
const singleColorRadio = document.querySelector('#singleColor');
const rainbowColorRadio = document.querySelector('#rainbowColor');
const colorSelect = document.querySelector('#color-select');

function setGridSize(newGridSize){
    gridContainer.innerHTML = "";
    root.style.setProperty('--gridSize', newGridSize);
    gridSizeSlider.value = newGridSize;
    gridSizeLabel.textContent = newGridSize + " x " + newGridSize;
    drawGrid(newGridSize);
}

function changeSelectedColorCSS(color){
    root.style.setProperty('--selectedCellColor', color);
}

function onSquareHover(e){
    if(e.buttons === 4){
        this.classList.remove('cell-selected');
        this.style.backgroundColor = root.style.getPropertyValue('--backgroundColor');
    }
    if(e.buttons !== 1)
        return;

    if(singleColorRadio.checked){
        this.style.backgroundColor = root.style.getPropertyValue('--selectedCellColor');
        this.classList.add('cell-selected');
    }
    else if(rainbowColorRadio.checked){
        let color = generateRandomColor();
        this.style.backgroundColor = color;
    }
    
}

function generateRandomColor(){
    let r = randomNumberFromIntervalIncluded(0,255);
    let g = randomNumberFromIntervalIncluded(0,255);
    let b = randomNumberFromIntervalIncluded(0,255);
    
    return "rgb(" + r + "," + g + "," + b + ")";
}

function randomNumberFromIntervalIncluded(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onSliderChange(e){
    setGridSize(this.value);
}

function drawGrid(gridSize){
    for(let i = 0; i < gridSize; i++){
        for(let j = 0; j < gridSize; j++){
            let square = document.createElement("div");
            square.classList.add('cell');
    
            square.addEventListener('mouseover', onSquareHover);
            square.addEventListener('mousedown', onSquareHover);
    
            gridContainer.appendChild(square);
        }   
    }
    
}

function resetEtchASketch(){
    setGridSize(16);
    singleColorRadio.checked = true;
    changeSelectedColorCSS(defaultSelectedColor);
    colorSelect.value = convertRGBstringTohexadecimal(root.style.getPropertyValue('--selectedCellColor'));
}

function clearGrid(){
    let gridSize = root.style.getPropertyValue('--gridSize');
    setGridSize(gridSize);
}

function colorChoosed(e){
    changeSelectedColorCSS(convertHexadecimalToRGBstring(e.target.value));
}

function convertRGBstringTohexadecimal(rgb){    
    let cssSplit = rgb.split("(")[1].split(")")[0];
    cssSplit = cssSplit.split(",");

    let number = cssSplit.map(function(x){
        x = parseInt(x).toString(16);
        return (x.length==1) ? "0"+x: x;
    });

    return "#"+number.join("");
}

function convertHexadecimalToRGBstring(hexa){
    let hexSplit = hexa.split("#")[1];
    hexSplit = hexSplit.match(/.{1,2}/g);

    let number = hexSplit.map(function(x){
        x = parseInt(x, 16);
        return x;
    });
    
    return "rgb(" + number[0] + ("," + number[1] + "," + number[2] + ")");
}

resetButton.addEventListener('click', resetEtchASketch);
clearButton.addEventListener('click', clearGrid);

changeSelectedColorCSS(defaultSelectedColor);
resetEtchASketch();

colorSelect.addEventListener("input", colorChoosed, false);

gridSizeSlider.onchange = onSliderChange;