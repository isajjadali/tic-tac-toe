var path = require('path');

module.exports = function (router) {
    /**
     * Send `index.html` To Requester
     */
    router.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'index.html'));
    });
};
