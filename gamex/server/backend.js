Web3 = require("web3")
solc = require("solc")
fs = require('fs');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
code = fs.readFileSync('gamex.sol').toString()
compiledCode = solc.compile(code)
abi = JSON.parse(compiledCode.contracts[':gamex'].interface)
gamexContract = web3.eth.contract(abi)
byteCode = compiledCode.contracts[':gamex'].bytecode
deployedContract = gamexContract.new({from:web3.eth.accounts[0], data: byteCode, gas: 4700000})

function write_address(){
	address = deployedContract.address
	fs.writeFile("./contract_address.txt", address, 
		function(error){
			if(error){
				console.error("there is some error");
			}
			else{
				// console.log(address)
			}
	});	
}


setTimeout(write_address, 2000);