

'use strict';

//config
global.CONFIG = require('./config');

//basic system requires
var express = require('express');
var vhost = require('vhost');
var path = require('path');


//virtual host creation
function createVirtualHost(domainName, pathHandler) {
    if(typeof pathHandler == 'string'){
        pathHandler = express.static(pathHandler);
    }
    return vhost(domainName, pathHandler);
};

//appz
var app = express();

//view engine
app.set('views', global.CONFIG.api.views);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(function (req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

//basic app requires for handling router path
var routeTable = {
	index: 			require(global.CONFIG.api.routes + '/index'),
	searchHistory: 	require(global.CONFIG.api.routes + '/search-history'),
	searchPopular: 	require(global.CONFIG.api.routes + '/search-popular'),
	category: 		require(global.CONFIG.api.routes + '/category'),
	filter: 		require(global.CONFIG.api.routes + '/filter'),
    statics: 		require(global.CONFIG.api.routes + '/statics'),
    bad: 			require(global.CONFIG.api.routes + '/bad')//for 404
};

// CLIENT
//path for client virtual host
app.use('/', createVirtualHost(global.CONFIG.client.host, global.CONFIG.client.root));
app.use('/assets', createVirtualHost(global.CONFIG.client.host, global.CONFIG.client.assets));
//for all other path from client
app.use('/*', createVirtualHost(global.CONFIG.client.host, routeTable.statics));

// SERVER
//path for the api virtual host
app.use('/', createVirtualHost(global.CONFIG.api.host, routeTable.index));
app.use('/assets', createVirtualHost(global.CONFIG.api.host, global.CONFIG.api.assets));
app.use('/search/history', createVirtualHost(global.CONFIG.api.host, routeTable.searchHistory));
app.use('/search/popular', createVirtualHost(global.CONFIG.api.host, routeTable.searchPopular));
app.use('/category', createVirtualHost(global.CONFIG.api.host, routeTable.category));
app.use('/filter', createVirtualHost(global.CONFIG.api.host, routeTable.filter));
app.use('/bad', createVirtualHost(global.CONFIG.api.host, routeTable.bad));
//for all other path api, service not found or 
//testing errors like bad json 
//or simple 404 error
app.use('/*', createVirtualHost(global.CONFIG.api.host, routeTable.bad));



//server start api
app.listen(global.CONFIG.api.port, global.CONFIG.api.ip, function(){
    console.log(global.CONFIG.api.name + ' ' + global.CONFIG.api.version + ' listening on ' + global.CONFIG.api.ip + ':' + global.CONFIG.api.port);
});

//server start client
app.listen(global.CONFIG.client.port, global.CONFIG.client.ip, function(){
    console.log(global.CONFIG.client.name + ' ' + global.CONFIG.client.version + ' listening on ' + global.CONFIG.client.ip + ':' + global.CONFIG.client.port);
});


//END SCRIPT