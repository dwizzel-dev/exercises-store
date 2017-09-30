
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    res.render('index.html');
    
});

module.exports = router;



//END SCRIPT