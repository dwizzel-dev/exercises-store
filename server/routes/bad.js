
var timeout = 0;
var pageTimeout = 1000;
var express = require('express');
var router = express.Router();

//the bad service 404 
router.get('/service', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    res.status(404);
    res.send('');
    res.end();
});

//the bad json format 
router.get('/json', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    res.status(200);
    res.set({
            'Content-Type': 'application/json'
            });
    res.send('{"msg":"badjson}');
    res.end();
});

//simple text return
router.get('/ok', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    res.status(404);
    res.set({
            'Content-Type': 'text/plain'
            });
    res.json({msg:"ok"});
    res.end();
});

//page not found
router.get('/*', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    res.status(404);
    res.render('404.html');
    res.end();
});


module.exports = router;



//END SCRIPT