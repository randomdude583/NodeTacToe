const errors = require('../errors');
const helpers = require('../helpers');



//GAME VARS
const WIDTH = 3;


let board;
let turn;
let winner;



const initGame = () => {
    board = [];
    for(i=1; i<=9; i++){
        board.push(i);
    }
    turn = "X";
    winner = null;

    return {board, turn, winner};
};


const move = (position) => {

    if(position < 1 || position > 9){
        throw errors.game.INVALID_POSITION;
    }
    if(board[position-1] == "X" || board[position-1] == "O"){
        throw errors.game.POSITION_FILLED
    }

    board[position-1] = turn;

    updateTurn();

    checkWin();

    return {board, turn, winner};
};


const checkWin = () => {
    // //Check verticals
    for(j=0; j < WIDTH; j++){
        column = []
        for(i=0; i < WIDTH; i++){
            column.push(board[i*WIDTH + j]);
        }
        if(helpers.array.allEqual(column)){
            winner = column[0];
        };
    }

    //Check horizontals
    for(i=0; i < WIDTH; i++){
        row = []
        for(j=0; j < WIDTH; j++){
            row.push(board[i*WIDTH + j]);
        }
        if(helpers.array.allEqual(row)){
            winner = row[0];
        };
    }


    
    //Check LR diagonal
    diagonal = [];
    for(row=0; row < WIDTH; row++){
        diagonal.push(board[row*WIDTH + row]);
    }
    if(helpers.array.allEqual(diagonal)){
        winner = diagonal[0];
    };

    //Check RL diagonal
    diagonal = [];
    for(row=0; row < WIDTH; row++){
        diagonal.push(board[row*WIDTH + (WIDTH-1-row)]);
    }
    if(helpers.array.allEqual(diagonal)){
        winner = diagonal[0];
    };

    //Check for stalemate
    let numX = 0;
    let numO = 0;
    for (var i = 0; i < board.length; i++) {
        if (board[i] === "X"){
            numX++;
        }
        if (board[i] === "O"){
            numO++;
        }
    }

    if(numX + numO == board.length && !winner){
        winner = "STALEMATE";
    }

};


const printBoard = () => {
    let out = "\n";

    for(i=0; i < WIDTH; i++){
        row = [];
        for(j=0; j < WIDTH; j++){
            row.push(board[i*WIDTH + j]);
        }
        out += `${row.join(' | ')}\n`;
    }
    
    return out;
}


const updateTurn = () => {
    let numX = 0;
    let numO = 0;
    for (var i = 0; i < board.length; i++) {
        if (board[i] === "X"){
            numX++;
        }
        if (board[i] === "O"){
            numO++;
        }
    }

    if(numX > numO){
        turn = "O";
    } else {
        turn = "X";
    }
};



module.exports = {
    initGame,
    move,
    printBoard,
    updateTurn
};