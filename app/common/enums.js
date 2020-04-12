'use strict';

/**
* Enums For Moves Of User And Server.
* @readonly
* @enum {string}
*/
module.exports.Moves = Object.freeze({
    Client: 'X',
    Server: 'O',
    Empty: '-',
});

/**
* Enums For Statuses Of Game.
* @readonly
* @enum {string}
*/
module.exports.Statuses = Object.freeze({
    Draw: 'Draw',
    OWon: 'O_WON',
    Running: 'RUNNING',
    XWon: 'X_WON'
});

/**
* Enums For Board States.
* @readonly
* @enum {string}
*/
module.exports.Board = Object.freeze({
    initialState: '---------',
});

/**
* Enums For Possible Winning Directions Of A Game.
* @readonly
* @enum {string}
*/
module.exports.PossibleWinningDirections = Object.freeze([
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]);

/**
* Enums For Most Tricking Directions Of A Game.
* @readonly
* @enum {string}
*/
module.exports.BestTrickingDirections = Object.freeze([
    [0, 1, 4],
    [0, 3, 4],
    [3, 6, 7],
    [4, 7, 8],
    [1, 4, 3],
    [1, 4, 5],
    [1, 2, 5],
    [7, 8, 5],
    [2, 5, 4],
    [8, 5, 4],
]);
