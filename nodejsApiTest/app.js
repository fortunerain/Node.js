//index.js
const express = require('express')
	app = express(),
    port = process.env.PORT || 3000,
    publicPath = '/sapui5',
    directory = __dirname + publicPath;
//sapui5 에서 호출하면 크로스도메인 문제로 인해 호출이 되지 않는다. cors 설치한다.
var cors    = require('cors');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//응답이 없음
//app.use(cors);
// set default mime type to xml for ".library" files
express.static.mime.default_type = "text/xml";
// app.param('collectionName', function(req, res, next, collectionName){
//   console.log("111111111111")
//   return next()
// })

app.use(express.static(directory));

//서버 컨트롤러 호출 index.js
var index = require('./routes/index');
app.use('/', index);


app.listen(port, ()=>{

	console.log('Example app listening on port 3000!')
})


