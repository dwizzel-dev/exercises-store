


var timeout = 0;
var pageTimeout = 2000;
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(global.CONFIG.db.conn, [
    'historics'
]);

// HISTORY ------------------------------------------------------------

//the historic of the user: set a keyword in history or retreive all
router.get('/', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    //client ip
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //check if its a update of a keyword
    // http://localhost:3000/api/history?&name=knee
    // http://api.exercises-store.com/search/history?&name=knee
    // http://api.exercises-store.com/search/history
    if(Object.keys(req.query).length){
        //minor check on validity
        if(typeof(req.query.name) == 'string'){
            if(req.query.name != ''){
                //insert or update the data
                updateHistory(res, req.query.name, ip);
            }else{
                sendErrorMsg(res, "name is empty");
                return;
            }        
        }else{
            sendErrorMsg(res, "name is missing");
            return;
        } 
    }else{
        getHistory(res, ip);
    }
    //set a timeout of 2 seconds if request take too long to process
    //since the call to db will be asynchrone
    timeout = setTimeout(sendErrorMsg.bind(null, res, "timeout"), pageTimeout);
});

//delete an entry history
router.delete('/:id', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    //client ip
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //delete
    deleteHistory(res, req.params.id, ip);
    //set a timeout of 2 seconds if request take too long to process
    //since the call to db will be asynchrone
    timeout = setTimeout(sendErrorMsg.bind(null, res, "timeout"), pageTimeout);
});

//add keyword in history
router.post('/', function(req, res, next){
    console.log(req.baseUrl);
    console.log(__filename + ':' + req.connection.remoteAddress);
    //client ip
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var history = req.body;
    //minor check on validity
    if(history.name != ''){
        //insert or update the data
        updateHistory(res, history.name, ip);
    }else{
        sendErrorMsg(res, "name is empty");
        return;
    }
    //set a timeout of 2 seconds if request take too long to process
    //since the call to db will be asynchrone
    timeout = setTimeout(sendErrorMsg.bind(null, res, "timeout"), pageTimeout);
});

//delete specific id in the history in the mongoDB
function deleteHistory(res, id, ip){
    //toute les entrees un genre de clearall ou une seulement si id est defini
    if(id !== false){
        db.historic.remove({"_id": mongojs.ObjectId(id)}, function(err, values){
            if(err){
                sendErrorMsg(res, err); 
                return;
            }
            sendObject(res, values);
        });
    }else{
        db.historics.remove({"ip": ip}, function(err, values){
            if(err){
                sendErrorMsg(res, err); 
                return;
            }
            sendObject(res, values);
        });
    }
         
};


//update the history in the mongoDB
function updateHistory(res, str, ip){
    //to lowercase
    str = str.toLowerCase();
    //do an upsert
    db.historics.update(
        { 
            "name": str,
            "ip": ip 
        },
        {
            $inc: {"count": 1},
            $setOnInsert: {
                "name": str, 
                "ip":ip
            },
        },
        {
            upsert: true 
        }, 
        function(err, values){
            if(err){
                sendErrorMsg(res, err); 
                return;
            }
            sendObject(res, {"msg":"ok"});
        }
    );        
};

//get the history list
function getHistory(res, ip){
    //find all keywords in history of the user ordered by count descending
    db.historics.find({"ip":ip}).sort({'count':-1}, function(err, values){
        if(err){
           sendErrorMsg(res, err); 
           return;
        }
        //only send the name
        var arr = [];
        for(var i = 0; i<values.length; i++){
            arr.push({
                _id: values[i]._id, 
                name: values[i].name,
                count: values[i].count
            });        
        }
        sendObject(res, arr);
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
            'Content-Type': 'application/json',
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