'use strict';

module.exports = function (router) {
    router.get('/', (req, res) => {
        res.http200({
            status: 'Working fine!',
        });
    });
};
