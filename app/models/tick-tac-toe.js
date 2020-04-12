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

    /**
     * It Updates The Status
     * @param {string} status
     * @private
     */
    _updateStatus(status) {
        this.status = status;
    }

    /**
     * It Updates The Status If Client Wins
     * @param {Array} parsedBoard
     * @return {boolean}
     * @private
     */
    _isXWon(parsedBoard = []) {
        return PossibleWinningDirections.some(direction => {
            if (direction.every(point => parsedBoard[point] === Moves.Client)) {
                this._updateStatus(Statuses.XWon);
                return true;
            }
        });
    }

    /**
     * It Updates The Status If Server Wins
     * @param {Array} parsedBoard
     * @return {boolean}
     * @private
     */
    _makeOWin(parsedBoard = []) {
        return this._isWinningPossibilityExist(parsedBoard, Moves.Server, (point) => {
            parsedBoard[point] = Moves.Server;
            this._updateStatus(Statuses.OWon);
            return true;
        });
    }

    /**
     * It Stops The Client To Win 
     * @param {Array} parsedBoard
     * @return {boolean}
     * @private
     */
    _stopXToWin(parsedBoard = []) {
        return this._isWinningPossibilityExist(parsedBoard, Moves.Client, (point) => {
            parsedBoard[point] = Moves.Server;
            return true;
        });
    }

    /**
     * It Checks The Winning Possibilty Of One'S 
     * @param {Array} parsedBoard
     * @return {boolean}
     * @private
     */
    _isWinningPossibilityExist(parsedBoard = [], move, callback) {
        return PossibleWinningDirections.some(direction => {
            const winningPossibility = this._findWinningPossibility(direction, parsedBoard, move);
            return winningPossibility.exist && callback(winningPossibility.emptyPoint);
        });
    }

    /**
     * It Updates The Status If Game Is Draw 
     * @param {Array} parsedBoard
     * @return {boolean}
     * @private
     */
    _isGameDraw(parsedBoard = []) {
        if (parsedBoard.filter(point => point === Moves.Empty).length <= 2) {
            this._updateStatus(Statuses.Draw);
            return true;
        }
        return false;
    }

    /**
     * It Select The Best Tricking Direction To Update The Server Move 
     * @param {Array} parsedBoard
     * @return {boolean}
     * @private
     */
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

    /**
     * It Update The Best Possible Move For Server 
     * @param {Array} parsedBoard
     * @return {boolean}
     * @private
     */
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
     * @returns {object} 
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
