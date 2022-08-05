let gridContainer = document.querySelector(".grid-container");

let gridSize = 64;

let root = document.querySelector(':root');
root.style.setProperty('--gridSize', gridSize);


function onSquareHover(e){
    this.classList.add('cell-selected');
}

for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
        let square = document.createElement("div");
        square.classList.add('cell');

        square.addEventListener('mouseover', onSquareHover);

        gridContainer.appendChild(square);
    }   
}

