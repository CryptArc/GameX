

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	alert("please install metamask or use mist browser to use this applicaion.")
}


var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"player","type":"address"},{"name":"game_name","type":"bytes"},{"name":"game_credit_unique_number","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"addGameCredit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"buyCredits","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"getAllGames","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"game_name","type":"bytes"}],"name":"addGame","outputs":[{"name":"","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"totSales","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"game_name","type":"bytes"},{"name":"game_credit_unique_number","type":"uint256"},{"name":"sell_amount","type":"uint256"},{"name":"total_price","type":"uint256"}],"name":"sellCredit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGameLen","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tot_users","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"},{"name":"game_name","type":"bytes"}],"name":"getAllCreditsOfAGame","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"listAllSales","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"sender","type":"address"}],"name":"isRegistered","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tot_items","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMySales","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"cancelCreditSale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"nameSize","type":"uint8"}],"name":"newUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

gamexContract = web3.eth.contract(abi);

gamexInstance = gamexContract.at('0x5de17aff6d4021914ab272168f5acde6f90b732d');			// Paste the copied address here

$login = $("#login");
$signup = $("#signup");
$games = $("#games");
$rogers = $("#rogers");
$register_game = $("#register_game");

// LOGIN PAGE

$login.on('click',()=>{
	gamexInstance.isRegistered(web3.eth.accounts[0],(error,result)=>{
		if(!error) {
			$.post("/home");
			$.ajax({
			        type: 'POST',
			        url: 'http://localhost:3000/home',
			        success:function(data, code, jqXHR) {
			            window.location.pathname = "home.html"
			        }
			});

			// console.log("address : "+ web3.toAscii(result[0]).substr(0,result[1]))
			// console.log(result);
		}
		else {
			alert("you aren't registered yet. Please Sign up first.")
			console.log(error);
		}
	});
});

$signup.on('click',()=>{

	var person = prompt("Please enter your name (less than 30 characters)", "");

	if (person != null) {
		size = person.length;
		person = web3.fromAscii(person);
		gamexInstance.newUser(person,size, (error,result)=>{
			if(!error) {
				alert("You have been successfully registered "+person+". You can Log in now.")
				console.log(result);
			} else {
				alert("Sign up failed. Try logging in, you might be already registered.")
				console.log(error);
			}
		});
	} else {
		alert("Please try signing up again with correct name.")
	}
});


// HOME PAGE

$games.on('click',()=> {
	gamexInstance.getAllGames(web3.eth.accounts[0],(error,result)=>{
		if(!error) {
			console.log("RESULT :"+result);
			$.ajax({
				type: 'GET',
				url: 'http://localhost:3000/games',
				success:(data,code,jqXHR)=>{
					window.location.pathname = "games.html"
					console.log("RESULT :"+result);
				}
			});
		}else {
			console.log(error);
		}
	});
});

$register_game.on('click', ()=>{
	var game_name = prompt("Please enter Game's name (less than 30 characters)", "");
	if (game_name != null) {
		game_name = web3.fromAscii(game_name);
		gamexInstance.addGame(game_name, (error,result)=>{
			if(!error) {
				alert("Game has been successfully registered. You are now this game's owner.")
				console.log(result);
			} else {
				alert("Registration failed. Please try again.")
				console.log(error);
			}
		});
	} else {
		alert("Please try again with valid name.")
	}
});

// GAMES PAGE

$rogers.on('click', ()=>{
	window.location = "http://localhost:3000/rogers";
});



