require("dotenv").config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ROPSTEN_PUBLIC_ADDRESS = process.env.ROPSTEN_PUBLIC_ADDRESS;
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;
const DEPLOYED_SMART_CONTRACT_ADDRESS_ROPSTEN =
  process.env.DEPLOYED_SMART_CONTRACT_ADDRESS_ROPSTEN;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
);
const contract = require("../src/artifacts/contracts/BaseSmartContract.sol/BaseSmartContract.json");

//+-If you want to see the ABI you can print it to your console:_
//console.log(JSON.stringify(contract.abi));

const contractAddress = DEPLOYED_SMART_CONTRACT_ADDRESS_ROPSTEN;
const baseSmartContract = new web3.eth.Contract(contract.abi, contractAddress);

async function SomeFunctionExampleContract() {
  const nonce = await web3.eth.getTransactionCount(
    ROPSTEN_PUBLIC_ADDRESS,
    "latest"
  ); // get latest nonce
  const gasEstimate = await baseSmartContract.methods
    .SomeFunctionExample()
    .estimateGas(); // estimate gas

  //+-Create the transaction:_
  const tx = {
    from: ROPSTEN_PUBLIC_ADDRESS,
    to: contractAddress,
    nonce: nonce,
    gas: gasEstimate,
    data: baseSmartContract.methods.SomeFunctionExample().encodeABI(),
  };

  //+-Sign the transaction:_
  const signPromise = web3.eth.accounts.signTransaction(
    tx,
    ROPSTEN_PRIVATE_KEY
  );
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\n Check Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });
}

async function ExecuteFunctionsHere() {
  const SomFuncExample = await SomeFunctionExampleContract();
  console.log("Some Function Example: " + SomFuncExample);
}
ExecuteFunctionsHere();
