let fields = [];
let currentShape = 'cross';
const rowIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const columnIndexes = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
const diagonalIndexes = [[0, 4, 8], [2, 4, 6]];
let gameOver = false;


function fillShape(index) {
    if (!fields[index] && !gameOver) {
        fields[index] = currentShape;
        currentShape = (currentShape == 'cross') ? 'circle' : 'cross';

        draw();
        checkForWin();
        toggleActivePlayer();
    }
}


function toggleActivePlayer() {
    document.getElementById('player-' + getActivePlayer()).classList.remove('player-inactive');
    document.getElementById('player-' + getInactivePlayer()).classList.add('player-inactive');
}


function getActivePlayer() {
    return (currentShape == 'cross') ? 1 : 2;
}


function getInactivePlayer() {
    return (currentShape == 'circle') ? 1 : 2;
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
    if (gameOver) {
        setTimeout(() => {
            document.getElementById('game-over').classList.remove('d-none');
            document.getElementById('restart-btn').classList.remove('d-none');
        }, 250);
    }
}


function checkForWinInRows() {
    let winner;
    let winnerRow;

    for (let i = 0; i < rowIndexes.length; i++) {
        const row = rowIndexes[i];
        if (lineWins(row, 'cross')) {
            winner = 'cross';
            winnerRow = i;
        }
        else if (lineWins(row, 'circle')) {
            winner = 'circle';
            winnerRow = i;
        }
    }

    if (winner) {
        console.log('GEWONNEN:', winner);
        document.getElementById('line-r' + winnerRow).style.transform = 'scaleX(1)';
        gameOver = true;
    }
}


function checkForWinInColumns() {
    let winner;
    let winnerColumn;

    for (let i = 0; i < columnIndexes.length; i++) {
        const column = columnIndexes[i];
        if (lineWins(column, 'cross')) {
            winner = 'cross';
            winnerColumn = i;
        }
        else if (lineWins(column, 'circle')) {
            winner = 'circle';
            winnerColumn = i;
        }
    }

    if (winner) {
        console.log('GEWONNEN:', winner);
        document.getElementById('line-c' + winnerColumn).style.transform = 'rotate(90deg) scaleX(1)';
        gameOver = true;
    }
}


function checkForWinInDiagonals() {
    let winner;
    let winnerDiagonal;

    for (let i = 0; i < diagonalIndexes.length; i++) {
        const diagonal = diagonalIndexes[i];
        if (lineWins(diagonal, 'cross')) {
            winner = 'cross';
            winnerDiagonal = i;
        }
        else if (lineWins(diagonal, 'circle')) {
            winner = 'circle';
            winnerDiagonal = i;
        }
    }

    if (winner) {
        console.log('GEWONNEN:', winner);
        let deg = (winnerDiagonal == 0) ? '45deg' : '-45deg';
        document.getElementById('line-d' + winnerDiagonal).style.transform = `rotate(${deg}) scaleX(1)`;
        gameOver = true;
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


function restart() {
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');

    for (let i = 0; i < rowIndexes.length; i++) {
        document.getElementById('line-r' + i).style.transform = 'scaleX(0)';
    }

    for (let i = 0; i < columnIndexes.length; i++) {
        document.getElementById('line-c' + i).style.transform = 'rotate(90deg) scaleX(0)';
    }

    for (let i = 0; i < diagonalIndexes.length; i++) {
        let deg = (i == 0) ? '45deg' : '-45deg';
        document.getElementById('line-d' + i).style.transform = `rotate(${deg}) scaleX(0)`;
    }

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field == 'cross') {
            document.getElementById('cross-' + i).classList.add('d-none');
        }
        else if (field == 'circle') {
            document.getElementById('circle-' + i).classList.add('d-none');
        }
    }

    gameOver = false;
    fields = [];
}