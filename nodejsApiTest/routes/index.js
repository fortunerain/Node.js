//index.js
var express = require('express');
var router = express.Router();

// mongo db 연결
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});


 
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("main");
  res.sendFile('mockServer.html', {
     root: './sapui5/test'
   });
});

router.get('/test', function(req, res, next) {
  console.log("test");
  var data = {
				title:'게시판 리스트'
			}
	return res.json(data);
});


// 해당 테이블 전체 조회
router.get('/api/:collectionName', function(req, res){

	req.collection.find().toArray(function(err, results){
        if (err) return next(err)
        if (!results) return res.json({"result" : "No users to display."});
    	console.log("11111111111");
    	var jsonData = JSON.stringify(results);
    	var jsonObject = JSON.parse(jsonData);
    	console.log(jsonObject);
    	res.send(jsonObject);
//        res.json(results);
    })
});

router.param('collectionName', function(req, res, next, collectionName){

  	req.collection = db.collection(collectionName)

  	return next()
})

// 특정 이름 조회
router.get('/api/:collectionName/:name', function(req, res) {

	req.collection.findOne({name: req.params.name}, function(err, result){
		if (err) return next(err)
	    if (!result) return res.json({"result" : "No users to display."});
		res.json(result);
	})
})

module.exports = router;
