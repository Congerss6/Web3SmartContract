// 导入web3库
const Web3 = require('web3');

// 设置以太坊节点的RPC URL
const rpcUrl = 'http://localhost:8545'; // 请替换为你的以太坊节点的RPC URL

// 创建web3实例
const web3 = new Web3(rpcUrl);

// 智能合约地址
const contractAddress = '0x1234567890123456789012345678901234567890'; // 请替换为你的智能合约地址

// 智能合约ABI (JSON格式)
const contractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "getValue",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newValue",
        "type": "uint256"
      }
    ],
    "name": "setValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; // 请替换为你的智能合约ABI

// 创建智能合约实例
const contract = new web3.eth.Contract(contractABI, contractAddress);

// 从智能合约中获取值
contract.methods.getValue().call((err, result) => {
  if (!err) {
    console.log('Value:', result);
  } else {
    console.error('Error:', err);
  }
});

// 向智能合约中设置新值
const newValue = 100; // 请替换为你要设置的新值
contract.methods.setValue(newValue).send({ from: '0xYourAddress' }) // 请替换为你的以太坊地址
  .on('transactionHash', (hash) => {
    console.log('Transaction Hash:', hash);
  })
  .on('confirmation', (confirmationNumber, receipt) => {
    console.log('Confirmation Number:', confirmationNumber);
    console.log('Receipt:', receipt);
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });
