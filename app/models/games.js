'use strict';

const TicTacToe = require('./tick-tac-toe');

class Games {
    constructor() {
        this.games = {};
    }

    getAll() {
        return Object.values(this.games);
    }

    create() {
        const game = new TicTacToe();
        this.games[game.id] = game;
        return game;
    }

    getById(id) {
        return this.games[id];
    }

    delete(id) {
        if (!this.getById(id)) {
            return false;
        }
        return delete this.games[id];
    }
}

module.exports = Games;
