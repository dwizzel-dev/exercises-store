
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/*', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    try{
        var filePath = path.join(global.CONFIG.client.root + req.baseUrl); 
        console.log("<" + filePath + ">");
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        }else{
            res.status(404);
            res.render('404.html');
        }
        
    }catch(err){
        res.send('');
    }
});


module.exports = router;



//END SCRIPT