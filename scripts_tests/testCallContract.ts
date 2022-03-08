import Web3 from "web3"
require("dotenv").config()

const web3: Web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const privateKey: string = process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : ""
const address: string = process.env.ADDRESS ? process.env.ADDRESS : ""


const bytecode: string = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a73560405160405180910390a3610356806100db6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063893d20e81461003b578063a6f9dae114610059575b600080fd5b610043610075565b604051610050919061022a565b60405180910390f35b610073600480360381019061006e9190610276565b61009e565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461012c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161012390610300565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a73560405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610214826101e9565b9050919050565b61022481610209565b82525050565b600060208201905061023f600083018461021b565b92915050565b600080fd5b61025381610209565b811461025e57600080fd5b50565b6000813590506102708161024a565b92915050565b60006020828403121561028c5761028b610245565b5b600061029a84828501610261565b91505092915050565b600082825260208201905092915050565b7f43616c6c6572206973206e6f74206f776e657200000000000000000000000000600082015250565b60006102ea6013836102a3565b91506102f5826102b4565b602082019050919050565b60006020820190508181036000830152610319816102dd565b905091905056fea264697066735822122044ba9d4dbe71d65ca6287bbba18effad6e330bac05ecd13fbc44f1fdae0cac0b64736f6c634300080b0033"
const abi: string = `
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnerSet",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
`

const sendTransaction = async (transactionParameter: any) => {
  const chainId: number = await web3.eth.net.getId();
  const nonce: number = await web3.eth.getTransactionCount(address);

  const gas = 8000000

  const signedTx = await web3.eth.accounts.signTransaction({
    ...transactionParameter,
    nonce,
    gas,
    gasPrice: 100,
    chainId,
  }, privateKey)

  console.log(signedTx)

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction ? signedTx.rawTransaction : "")
  console.log(receipt)

  return receipt
}

const deployContract = async () => {
  const receipt = await sendTransaction({
    from: address,
    data: "0x" + bytecode,
  })
  console.log(receipt)
}

const callContract = async () => {
    const contractAddress: string = "0xA4aC15D64E5d718E03614Fb0DC566d1616E5dc7a"

    const contract: any = new web3.eth.Contract(JSON.parse(abi), contractAddress)

    const data = contract.methods.store(2).encodeABI()

    console.log(contract)
    const receipt = await sendTransaction({
        from: address,
        data,
        to: contractAddress
    })

    console.log(receipt)
}

//deployContract()
// callContract()
const contractAddress: string = "0xA4aC15D64E5d718E03614Fb0DC566d1616E5dc7a"

const contract: any = new web3.eth.Contract(JSON.parse(abi), contractAddress)
console.log(contract)
