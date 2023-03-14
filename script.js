let fields = [];
let currentShape = 'cross';
const rowIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const columnIndexes = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
const diagonalIndexes = [[0, 4, 8], [2, 4, 6]];


function fillShape(index) {
    fields[index] = currentShape;
    currentShape = (currentShape == 'cross') ? 'circle' : 'cross';

    draw();
    checkForWin();
}

function draw() {
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
        else if (field == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }
    }
}


function checkForWin() {
    checkForWinInRows();
    checkForWinInColumns();
    checkForWinInDiagonals();
}


function checkForWinInRows() {
    let winner;

    for (let i = 0; i < rowIndexes.length; i++) {
        const row = rowIndexes[i];
        if (lineWins(row, 'cross')) {
            winner = 'cross';
        }
        else if (lineWins(row, 'circle')) {
            winner = 'circle';
        }
    }

    if (winner) {
        console.log('GEWONNEN:', winner);
    }
}


function checkForWinInColumns() {
    let winner;

    for (let i = 0; i < columnIndexes.length; i++) {
        const column = columnIndexes[i];
        if (lineWins(column, 'cross')) {
            winner = 'cross';
        }
        else if (lineWins(column, 'circle')) {
            winner = 'circle';
        }
    }

    if (winner) {
        console.log('GEWONNEN:', winner);
    }
}


function checkForWinInDiagonals() {
    let winner;

    for (let i = 0; i < diagonalIndexes.length; i++) {
        const diagonal = diagonalIndexes[i];
        if (lineWins(diagonal, 'cross')) {
            winner = 'cross';
        }
        else if (lineWins(diagonal, 'circle')) {
            winner = 'circle';
        }
    }

    if (winner) {
        console.log('GEWONNEN:', winner);
    }
}


function lineWins(line, shape) {
    let shapeInLine = 0;
    for (let i = 0; i < line.length; i++) {
        index = line[i];
        if (fields[index] == shape) {
            shapeInLine++;
        }
    }
    return (shapeInLine == line.length) ? true : false;
}