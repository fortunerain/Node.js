//index.js
var express = require('express');
var router = express.Router();

// mongo db 연결
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	// CONNECTED TO MONGODB SERVER
	console.log("Connected to mongod server");
});

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.render('index', { title: 'Express' });
	console.log("main");
	res.sendFile('mockServer.html', {
		root : './sapui5/test'
	});
});

// 해당 테이블 전체 조회
router.get('/api/:collectionName', function(req, res) {

	req.collection.find().toArray(function(err, results) {
		if (err) return next(err)
		if (!results) return res.json({ "result" : "No users to display."});
		var collectionName = req.params.collectionName;
		// json 키값 동적 할당
		// 이런 방식은 안된다.
		// var users = {
		// collectionName : results
		// }
		var jsonData = {};
		jsonData[collectionName + "s"] = results;
		// 이미 json 형태이기 때문에 json함수 사용안해도 된다.
		// res.json(jsonData);
		res.send(jsonData);
	})
});

router.param('collectionName', function(req, res, next, collectionName) {
	console.log("param collectionName : " + collectionName);
	req.collection = db.collection(collectionName)

	return next()
})

// 특정 이름 조회
router.get('/api/:collectionName/:key', function(req, res) {
	var collectionName = req.params.collectionName;
	var keyVal = req.params.key;
	var keyData = {};
	if(collectionName=="user"){
		keyName = "name";
	}else if(collectionName=="note"){
		keyName = "title";
	}
	keyData[keyName] = keyVal;
	
	req.collection.findOne(keyData, function(err, result) {
		if (err) return next(err)
		if (!result) return res.json({ "result" : "No users to display."});

		var jsonData = {};
		jsonData[collectionName + "s"] = result;

		res.send(jsonData);
	})
})


// 특정 이름 조회
router.post('/api/write',(req, res, next) => {
	// 1.넘어온 값을 받는다.

	var title = req.body.title;
	var contents = req.body.contents;
	
	
	var json = {
		"result":"success"
	}
	res.json(json);
	
	console.log("title : "+title+" contents : "+contents); 
})

module.exports = router;
