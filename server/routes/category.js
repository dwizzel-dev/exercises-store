/*
# mongoDB
# connect to db:
mongo mongodb://127.0.0.1:3030
# categories collection in keywords db:
use keywords
db.categories.insertMany([
	{"name": "pilates", "lang":"en_US"},
	{"name": "yoga", "lang":"en_US"},
	])
*/

var timeout = 0;
var pageTimeout = 2000;
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(global.CONFIG.db.conn, [
    'categories'
]);

//the categories 
router.get('/', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    //get les categories
    var lang = "en_US";
    getCategories(res, lang);
    //set a timeout of 2 seconds if request take too long to process
    //since the call to db will be asynchrone
    timeout = setTimeout(sendErrorMsg.bind(null, res, "timeout"), pageTimeout);
});

//get the categories list
function getCategories(res, lang){
    //find all categories depending on the language ordre by name desc
    db.categories.find({"locale":lang}).sort({'name':1}, function(err, values){
        if(err){
           sendErrorMsg(res, err); 
           return;
        }
        //send all
        sendObject(res, values);
        //only send the name
        /*
        var arr = [];
        for(var i = 0; i<values.length; i++){
            arr.push({
                _id: values[i]._id, 
                name: values[i].name,
                activated: values[i].activated
            });        
        }
        sendObject(res, arr);
        */
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
        if(obj.hasOwnProperty('error')){
            res.status(400);
        }
        res.set({
            'Content-Type': 'application/json'
            });
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