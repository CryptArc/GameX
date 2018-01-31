var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static('public'));

app.get('/', urlencodedParser, function(req, res){
	res.send("Hi there");
});

app.post('/register_score', urlencodedParser, function (req, res) {
	// response = {
	// 	username:req.body.name,
	// 	password:req.body.password
	// };
	// console.log(JSON.stringify(response));
	
	// if(response.username === "himanshu" && response.password === "root"){
	// 	res.sendFile(__dirname + '/market.html');
	// }else{
	// 	res.send("Wrong Password");
	// 	res.end()
	// }
	res.send("hello");
	console.log(req.body);
});
 

app.listen(4000, function(){
	console.log('Listening at port 4000');
});