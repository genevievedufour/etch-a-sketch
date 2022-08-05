let gridContainer = document.querySelector(".grid-container");

let root = document.querySelector(':root');

let gridSizeSlider = document.querySelector("#grid-size-slider");
let gridSizeLabel= document.querySelector("#grid-size-label");
let resetButton = document.querySelector("#reset-button");

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
    }
    if(e.buttons !== 1)
        return;

    this.classList.add('cell-selected');
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
}

resetButton.addEventListener('click', resetGrid);

gridSizeSlider.onchange = onSliderChange;
