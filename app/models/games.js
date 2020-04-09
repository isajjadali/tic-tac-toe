'use strict';

const TicTacToe = require('./tick-tac-toe');

class Games {
    constructor() {
        this.games = [];
    }

    getAll() {
        return this.games;
    }

    create() {
        const game = new TicTacToe();
        this.games.unshift(game);
        return game;
    }

    getById(id) {
        return this.games.find(game => game.id === id);
    }

    delete(id) {
        const isGameExistAgainstId = this.games.findIndex(game => game.id === id);

        if (isGameExistAgainstId > -1) {
            this.games.splice(isGameExistAgainstId, 1);
            return true;
        }

        return false;
    }
}

module.exports = Games;
