'use strict';

const uuidMaker = require('uuid/v4');
const {
    BestTrickingDirections,
    Board,
    PossibleWinningDirections,
    Statuses,
    Moves
} = require('../common/enums');

let selectedWinningPossibilty;

class TicTacToe {
    constructor() {
        this.id = uuidMaker();
        this.status = Statuses.Running;
        this.board = Board.initialState;
    }

    update(board = Statuses.initialState) {
        const parsedBoard = board.split('');

        let isBoardUpdated = false;
        PossibleWinningDirections.every(direction => {
            if (direction.every(point => parsedBoard[point] === Moves.Client)) {
                this.status = Statuses.XWon;
                isBoardUpdated = true;
                return false;
            }
            if (this._findWinninfPossibility(direction, parsedBoard, Moves.Server)) {
                direction.forEach(point => parsedBoard[point] = Moves.Server);
                this.status = Statuses.OWon;
                isBoardUpdated = true;
                return false;
            }
            if (this._findWinninfPossibility(direction, parsedBoard, Moves.Client)) {
                direction.forEach(point => parsedBoard[point] === Moves.Empty && (parsedBoard[point] = Moves.Server));
                isBoardUpdated = true;
                return false;
            }
            return true;
        });

        if (!isBoardUpdated) {
            if (parsedBoard.filter(point => point === Moves.Empty).length <= 2) {
                this.status = Statuses.Draw;
                return this.board;
            }
            if (!selectedWinningPossibilty || !(selectedWinningPossibilty || []).some(point => point === Moves.Client)) {
                const remainingDirections = BestTrickingDirections.filter(direction => direction.every(point => parsedBoard[point] !== Moves.Client));
                selectedWinningPossibilty = remainingDirections[Math.floor(Math.random() * remainingDirections.length)];
            }
            (selectedWinningPossibilty || []).every(point => {
                if (parsedBoard[point] === Moves.Empty) {
                    parsedBoard[point] = Moves.Server;
                    return false;
                }
                return true;
            });
        }
        this.board = parsedBoard.join('');
        return this.board;
    }

    _findWinninfPossibility(direction, board, user) {
        const count = direction.reduce((acc, point) => {
            board[point] === user && ++acc;
            return acc;
        }, 0);
        return count === 2 && direction.some(point => board[point] === Moves.Empty);
    }
}

module.exports = TicTacToe;
