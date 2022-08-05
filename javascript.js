const gridContainer = document.querySelector(".grid-container");

const root = document.querySelector(':root');

const gridSizeSlider = document.querySelector("#grid-size-slider");
const gridSizeLabel= document.querySelector("#grid-size-label");
const resetButton = document.querySelector("#reset-button");
const clearButton = document.querySelector('#clear-button');
const singleColorRadio = document.querySelector('#singleColor');
const rainbowColorRadio = document.querySelector('#rainbowColor');

resetGrid();

function setGridSize(newGridSize){
    gridContainer.innerHTML = "";
    root.style.setProperty('--gridSize', newGridSize);
    gridSizeSlider.value = newGridSize;
    gridSizeLabel.textContent = newGridSize + " x " + newGridSize;
    drawGrid(newGridSize);
}

function onSquareHover(e){
    if(e.buttons === 4){
        this.classList.remove('cell-selected');
        this.style.backgroundColor = root.style.getPropertyValue('--selectedCellColor');
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

function resetGrid(){
    setGridSize(16);
    singleColorRadio.checked = true;
}

function clearGrid(){
    let gridSize = root.style.getPropertyValue('--gridSize');
    setGridSize(gridSize);
}

resetButton.addEventListener('click', resetGrid);
clearButton.addEventListener('click', clearGrid);

gridSizeSlider.onchange = onSliderChange;
