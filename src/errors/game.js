const INVALID_POSITION = new Error("Invalid Position!");
const INVALID_PLAYER = new Error("Invalid Player!");
const WRONG_TURN = new Error("It is not your turn!");
const POSITION_FILLED = new Error("This position is already taken!");
const GAME_OVER = new Error("The game is already over!")




module.exports= {
    INVALID_POSITION,
    INVALID_PLAYER,
    WRONG_TURN,
    POSITION_FILLED,
    GAME_OVER,
};