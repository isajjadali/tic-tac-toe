const fs = require('fs');
const path = require('path');

// Global Path Variables
global.appRoot = __dirname;
global.paths = {};

defineNodeFoldersPathsOnGlobalObject();

function defineNodeFoldersPathsOnGlobalObject() {
    fs.readdirSync(
        path.resolve(`${__dirname.split('\\').pop()}`)
    ).filter(str => !str.includes('.')).forEach(dir => global.paths[dir] = `${global.appRoot}/${dir}`);
}
