'use strict';

var path = require('path');
var basepath = path.normalize(__dirname);

var config = {
    maxpagetimeout: 3000,
    api: {
        name: 'Api Server Exercises-Store',
        version: '1.0.0',
        ip: '127.0.0.1',
        host: '127.0.0.1',
        port: 80,
        routes: path.join(basepath, './routes'),
        views: path.join(basepath, './views'),
        assets: path.join(basepath, './dist/1.0.0/assets'),
        allow: '*'
    },
    client: {
        name: 'Client Server Exercises-Store',
        version: '1.0.0',
        ip: '127.0.0.2',
        host: '127.0.0.2',
        port: 80,
        root: path.join(basepath, './dist/1.0.0'),
        assets: path.join(basepath, './dist/1.0.0/assets'),
        allow: '*'
    },
    db: {
        conn: 'mongodb://127.0.0.1:3030/keywords'
    },
};

console.log(config);

module.exports = config;

//END SCRIPT