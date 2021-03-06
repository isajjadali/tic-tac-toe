'use strict';

class Games {
    constructor() {
        this.games = {};
    }

    /**
     * Get The Whole Collection Of Games
     * @returns {Array}
     */
    getAll() {
        return Object.values(this.games);
    }

    /**
     * Create A New Game
     * @param {object} game
     * @returns {object}
     */
    create(game) {
        this.games[game.id] = game;
        return game;
    }

    /**
     * Get Game From Collection
     * @param {string} id
     * @returns {object}
     */
    getById(id) {
        return this.games[id];
    }

    /**
     * Delete Game From Collection
     * @param {string} id
     * @returns {boolean}
     */
    delete(id) {
        if (!this.getById(id)) {
            return false;
        }
        return delete this.games[id];
    }
}

module.exports = Games;
