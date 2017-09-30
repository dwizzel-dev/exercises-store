
var timeout = 0;
var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');


//the popular keyword  retreive all
router.get('/', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    //get them all
     //connection to DB
    mongoClient.connect(global.CONFIG.db.conn, function(err, db) {
        assert.equal(null, err);
        console.log("connection success.");
        getPopular(db, res, function(){
            db.close();
        });
    });
    //set a timeout of 2 seconds if request take too long to process
    //since the call to db will be asynchrone
    timeout = setTimeout(sendErrorMsg.bind(null, res, "timeout"), global.CONFIG.maxpagetimeout);
});

//get the popular list
function getPopular(db, res, callback){
    //find all keywords in popular ordered by count descending
    var arr = [];
    var cursor = db.collection('popular').aggregate([
        {
            $project:{
                '_id':1,
                'name':1,
                'count':1
            }
        }
    ]).sort({'count':-1});

    cursor.each(function(err, doc){
        assert.equal(err, null);
        if(doc != null){
            arr.push(doc);
        }else{
            sendObject(res, arr);
            callback();
        }
    });
};


// GENERIC ------------------------------------------------------------


//send an object response to the client
function sendObject(res, obj){
    console.log(obj);
    //onclear le timeout
    clearTimeout(timeout);
    //check si erreur
    try{
        //check le header for erreur
        res.set({
            'Content-Type': 'application/json'
        });
        if(obj.hasOwnProperty('error')){
            res.status(400);
        }
        res.json(obj);
    }catch(err){
        console.log(err); 
    }
};

//send an error message response to the client in json format
function sendErrorMsg(res, obj){
    //minor check
    try{
        sendObject(res, {"error":obj});
    }catch(err){
        console.log(err);
    }
};

module.exports = router;



//END SCRIPT