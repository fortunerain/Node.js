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

var jsonData = {};
var collectionName = "";
// 해당 테이블 전체 조회
router.get('/api/:collectionName', function(req, res){

	req.collection.find().toArray(function(err, results){
        if (err) return next(err)
        if (!results) return res.json({"result" : "No users to display."});
    	collectionName = req.params.collectionName;
    	console.log("111111 : "+collectionName);
    	//json 키값 동적 할당
    	//이런 방식은 안된다. 
//    	var users = {
//    			collectionName : results
//    	}
    	
    	jsonData[collectionName+"s"] = results;
// 이미 json 형태이기 때문에 json함수 사용안해도 된다.
//        res.json(jsonData);
        res.send(jsonData);
    })
});

router.param('collectionName', function(req, res, next, collectionName){

  	req.collection = db.collection(collectionName)

  	return next()
})

// 특정 이름 조회
router.get('/api/:collectionName/:name', function(req, res) {
	console.log("22222222222");
	collectionName = req.params.collectionName;
	
	req.collection.findOne({name: req.params.name}, function(err, result){
		if (err) return next(err)
	    if (!result) return res.json({"result" : "No users to display."});
		
		jsonData[collectionName+"s"] = result;
		
		res.send(jsonData);
	})
})

module.exports = router;
