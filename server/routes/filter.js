/*
# mongoDB
# connect to db:
mongo mongodb://127.0.0.1:3030
# filters collection in keywords db:
use keywords
db.filters.insertMany([
	{"name": "pilates", "lang":"en_US"},
	{"name": "yoga", "lang":"en_US"},
	])
*/

var timeout = 0;
var pageTimeout = 1000;
var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//the filters 
router.get('/', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    //get les filters
    var lang = "en_US";
    //connection to DB
    mongoClient.connect(global.CONFIG.db.conn, function(err, db) {
        assert.equal(null, err);
        console.log("connection success.");
        getfilters(db, res, lang, function(){
            db.close();
        });
    });
    //set a timeout of 2 seconds if request take too long to process
    //since the call to db will be asynchrone
    timeout = setTimeout(sendErrorMsg.bind(null, res, "timeout"), global.CONFIG.maxpagetimeout);
});

//get the filters list
function getfilters(db, res, lang, callback){

    var arr = [];
    var cursor = db.collection('filters').aggregate([
        {
            $match: {
                'locale':lang
            }
        },
        {
            $project: {
                '_id':1,
                'name':1,
                'activated':1
            }
        }
    ]).sort({'name':1});

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
        }else{
            //for testing staus different then 200
            //res.status(210);
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