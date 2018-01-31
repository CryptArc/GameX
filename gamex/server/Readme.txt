Steps to Run the Demo

1. Open a new console in the current directory and type the following commands:
	$ node
	> Web3 = require("web3")
	> solc = require("solc")
	> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
	> code = fs.readFileSync('gamex.sol').toString()
	> compiledCode = solc.compile(code)
	> abi = JSON.parse(compiledCode.contracts[':gamex'].interface)
	> gamexContract = web3.eth.contract(abi)
	> byteCode = compiledCode.contracts[':gamex'].bytecode
	> deployedContract = gamexContract.new({from:web3.eth.accounts[0], data: byteCode, gas: 4700000})
	> deployedContract.address	  		// Copy this address
	
	
2. Paste the copied address from step 1 into the ./public/js/contract.js file.

	


Web3 = require("web3")
solc = require("solc")
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
code = fs.readFileSync('gamex.sol').toString()
compiledCode = solc.compile(code)
abi = JSON.parse(compiledCode.contracts[':gamex'].interface)
gamexContract = web3.eth.contract(abi)
byteCode = compiledCode.contracts[':gamex'].bytecode
deployedContract = gamexContract.new({from:web3.eth.accounts[0], data: byteCode, gas: 4700000})
deployedContract.address

[
'Web3 = require("web3")',
'solc = require("solc")',
'web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))',
'code = fs.readFileSync("gamex.sol").toString()',
'compiledCode = solc.compile(code)',
'abi = JSON.parse(compiledCode.contracts[":gamex"].interface)',
'gamexContract = web3.eth.contract(abi)',
'byteCode = compiledCode.contracts[":gamex"].bytecode',
'deployedContract = gamexContract.new({from:web3.eth.accounts[0], data: byteCode, gas: 4700000})',
'deployedContract.address'
]