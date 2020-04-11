'use strict';

const Games = require('../../../models/games');

const GameModal = new Games();
const { Statuses } = require('../../../common/enums');

module.exports = function (router) {

    router.param('id', (req, res, next, id) => {
        const game = GameModal.getById(id);

        if (!game) {
            return res.http404(`Game not found against id: ${id}`);
        }
        req.game = game;
        next();
    });

    router.route('/:id?')
        .get((req, res) => {
            if (req.game) {
                return res.http200(req.game);
            }
            res.http200(GameModal.getAll().reverse());
        })
        .post((req, res) => {
            const game = GameModal.create();
            res.http200(game);
        })
        .delete((req, res) => {
            const isGameDeletedSuccessfully = GameModal.delete(req.params.id);

            if (!isGameDeletedSuccessfully) {
                return res.http404(`Game not found against id: ${id}`);
            }
            res.http200('Game successfully deleted');
        })
        .put((req, res) => {
            if (req.game.status !== Statuses.Running) {
                return res.http400('Game is not avaiable to play');
            }
            const { board } = req.body;
            req.game.update(board);
            res.http200(req.game);
        })
};
