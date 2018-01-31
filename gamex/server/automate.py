from pexpect import spawn
from subprocess import call

class Gamex_Backend:

	def __init__(self):
		pass

	# returns Mnemonic
	# testrpc is renamed to ganache-cli,
	def run_testrpc(self):
		self.testrpc = spawn("ganache-cli")
		self.testrpc.expect("Mnemonic:")
		self.testrpc.expect("Base")
		mnemonic = self.testrpc.before.decode("utf-8")
		mnemonic = mnemonic.strip()
		return mnemonic

	# returns address of deployed contract
	def deploy_contract(self):
		call(['node', 'backend.js'])

		address = None
		with open("contract_address.txt","r") as f:
			address = f.read()
		return address

if __name__ == "__main__":
	obj = Gamex_Backend()
	mnemonic = obj.run_testrpc()
	print("Use this mnemonic to login via metamask")
	print("Mnemonic: ",mnemonic)

