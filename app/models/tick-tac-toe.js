'use strict';

const uuidMaker = require('uuid/v4');
const {
    BestTrickingDirections,
    Board,
    PossibleWinningDirections,
    Statuses,
    Moves
} = require('../common/enums');

let selectedWinningPossibilty = [];

class TicTacToe {
    constructor() {
        this.id = uuidMaker();
        this.status = Statuses.Running;
        this.board = Board.initialState;
    }

    /**
     * Update The Board
     * @param {string} board
     * @returns {string}
     */
    update(board = Statuses.initialState) {
        const parsedBoard = board.split('');

        this._isXWon(parsedBoard)
            || this._makeOWin(parsedBoard)
            || this._stopXToWin(parsedBoard)
            || this._isGameDraw(parsedBoard)
            || (this._selectBestTrickingDirection(parsedBoard)
                && this._runBestTrickingMove(parsedBoard))

        return this.board = parsedBoard.join('');

    }

    _isXWon(parsedBoard = []) {
        return PossibleWinningDirections.some(direction => {
            if (direction.every(point => parsedBoard[point] === Moves.Client)) {
                this.status = Statuses.XWon;
                return true;
            }
        });
    }


    _makeOWin(parsedBoard = []) {
        return PossibleWinningDirections.some(direction => {
            const winningPossibility = this._findWinningPossibility(direction, parsedBoard, Moves.Server);
            if (winningPossibility.exist) {
                parsedBoard[winningPossibility.emptyPoint] = Moves.Server;
                this.status = Statuses.OWon;
                return true;
            }
        });
    }

    _stopXToWin(parsedBoard = []) {
        return PossibleWinningDirections.some(direction => {
            const winningPossibility = this._findWinningPossibility(direction, parsedBoard, Moves.Client);
            if (winningPossibility.exist) {
                parsedBoard[winningPossibility.emptyPoint] = Moves.Server;
                return true;
            }
        });
    }

    _isGameDraw(parsedBoard = []) {
        if (parsedBoard.filter(point => point === Moves.Empty).length <= 2) {
            this.status = Statuses.Draw;
            return true;
        }
        return false;
    }


    _selectBestTrickingDirection(parsedBoard = []) {
        if (
            !selectedWinningPossibilty.length
            || !(selectedWinningPossibilty).some(point => point === Moves.Client)
        ) {
            const remainingDirections = BestTrickingDirections.filter(direction => direction.every(point => parsedBoard[point] !== Moves.Client));
            selectedWinningPossibilty = remainingDirections[Math.floor(Math.random() * remainingDirections.length)];
        }
        return true;
    }

    _runBestTrickingMove(parsedBoard = []) {
        selectedWinningPossibilty.every(point => {
            if (parsedBoard[point] === Moves.Empty) {
                parsedBoard[point] = Moves.Server;
                return false;
            }
            return true;
        });
    }

    /**
     * Find The Winnig Posibility Of User/Server
     * @param {Array} direction
     * @param {Array} parsedBoard
     * @param {string} move
     * @returns {boolean} 
     * @private
     */
    _findWinningPossibility(direction, parsedBoard, move) {
        let emptyPoint;
        const moveCount = direction.filter(point => {
            parsedBoard[point] === Moves.Empty && (emptyPoint = point);
            return parsedBoard[point] === move;
        }).length;

        return {
            exist: !!(moveCount === 2 && emptyPoint),
            emptyPoint,
        }
    }
}

module.exports = TicTacToe;
