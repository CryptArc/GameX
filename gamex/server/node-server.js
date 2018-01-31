var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var Web3 = require('web3');

var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static('public'));

//web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// AbiDefination of the Contract
//var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"player","type":"address"},{"name":"game_name","type":"bytes"},{"name":"game_credit_unique_number","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"addGameCredit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"buyCredits","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"getAllGames","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"game_name","type":"bytes"}],"name":"addGame","outputs":[{"name":"","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"totSales","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"game_name","type":"bytes"},{"name":"game_credit_unique_number","type":"uint256"},{"name":"sell_amount","type":"uint256"},{"name":"total_price","type":"uint256"}],"name":"sellCredit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGameLen","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tot_users","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"newUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"},{"name":"game_name","type":"bytes"}],"name":"getAllCreditsOfAGame","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"listAllSales","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tot_items","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMySales","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"cancelCreditSale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');


//console.log("web3:"+JSON.stringify(Web3.providers.HttpProvider))
//gamexContract = web3.eth.contract(abi)

//gamexInstance = gamexContract.at('0x12d9a0b99521de1a224ae41ed9885ebe66563f10');

//#####################################
//#			GET REUESTS   #
//#####################################


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/games', function(req,res){
	console.log(__dirname+"/games.html");
	res.sendFile(__dirname + "/games.html");
});

app.get('/market', function(req,res){
	res.sendFile(__dirname + '/market.html');	
});

app.get('/duckhunt', function(req,res){
	// duck hunt
	res.redirect("http://localhost:8080");
});

app.get('/rogers', function(req,res){
	// captain rogers	
	res.sendFile(__dirname + "/rogers.html");
});



//#####################################

app.post('/home', function (req, res) {
	res.status(200)
	res.sendFile(__dirname + '/home.html');
	res.end();
	console.log('page loaded');
});


app.listen(3000, function(){
	console.log('Listening at port 3000');
});
