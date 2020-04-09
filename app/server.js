'use strict';

const app = require('./index');
const http = require('http');

const server = http.Server(app);
server.listen(process.env.PORT);

server.on('listening', function () {
    console.info(`Server listening on http://localhost:${this.address().port}`);
});
