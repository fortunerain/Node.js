//index.js
const express = require('express')
	app = express(),
    port = process.env.PORT || 3000;
//    publicPath = '/sapui5',
//    directory = __dirname + publicPath;

//크로스 도메인 문제로 제공하는 모듈인데 사용하면 해당 도메인에 요청을 못한다. 응답이 없다.
//var cors    = require('cors');
//app.use(cors);

var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sapui5 에서 호출하면 크로스도메인 문제로 인해 호출이 되지 않는다. 헤더 설정 필요
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});




// set default mime type to xml for ".library" files
express.static.mime.default_type = "text/xml";
// app.param('collectionName', function(req, res, next, collectionName){
//   console.log("111111111111")
//   return next()
// })

//app.use(express.static(directory));

//서버 컨트롤러 호출 index.js
var index = require('./routes/index');
app.use('/', index);


app.listen(port, ()=>{

	console.log('Example app listening on port 3000!')
})


