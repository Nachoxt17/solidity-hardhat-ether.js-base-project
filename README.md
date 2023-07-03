# Base-Smart-Contract

- Users can Connect their Wallets and **Write Here What Users can do in your D.A.P.P.**.

## For Testing the Successful S.C. DEMO Deployed in the Mumbai Polygon TestNet:

Smart Contract deployed with the account: ------------------
https://mumbai.polygonscan.com/address/------------------

- You can get Mumbai Test Matic Here:
https://faucet.polygon.technology

- How to Interact with the Deployed Smart Contract:
  https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-6-update-the-message

## Quick Project start:

:one: The first things you need to do are cloning this repository and installing its
dependencies:

```sh
npm install --location=global npm-check-updates
ncu -u
npm install --force
npm update --save
```

## Setup

:two: Copy and Paste the File ".env.example" inside the same Root Folder(You will Duplicate It) and then rename it removing the part of ".example" so that it looks like ".env" and then fill all the Data Needed Inside the File. In the part of "ALCHEMY_API_KEY"
just write the KEY, not the whole URL.

```sh
cp .env.example .env && nano .env
```

:three: Open a Terminal and let's Test your Project in a Hardhat Local Node. You can also Clone the Polygon Main Network in your Local Hardhat Node:
https://hardhat.org/guides/mainnet-forking.html

```sh
npx hardhat node
```

:four: Now Open a 2nd Terminal and Deploy your Project in the Hardhat Local Node. You can also Test it in the same Terminal:

```sh
npx hardhat test
```
- NOTE: Remember that you can Guide yourself about [Ethers.js Unit Testing with this Documentation.](https://docs.ethers.io/ethers.js/v3.0/html/api-utils.html)

## Solidity Smart Contracts Auditing Tools(Always use Linux Ubuntu/WSL 2.0 If Possible):

- NOTE: Always run all the Tools Directly in the Directory where the S.C. ```.sol``` Files are Located.

:hammer_and_wrench: For a Quick and Simple Audit of the Solidity Smart Contracts, you can Install and Use Slither-Analyzer:
[Slither-Analyzer Functioning Troubleshooting](https://github.com/crytic/slither/issues/1103)
- Installation:
- First Install the Solidity Versions Selector:
```sh
pip3 install solc-select
solc-select versions
solc-select install
```
- Install Slither For Windows WSL Linux Ubuntu Console:
```sh
pip3 install -U https://github.com/crytic/crytic-compile/archive/refs/heads/dev-windows-long-paths.zip
crytic-compile --v
pip3 install -U https://github.com/elopez/slither/archive/refs/heads/windows-ci.zip
slither --v
```
Or in any other case:
```sh
pip3 install crytic-compile==0.2.2
crytic-compile --v
pip3 install slither-analyzer==0.8.2
slither --v
```
### Usage:
- Analyze all the S.C.s inside a Directory:
```sh
slither .
```
- Analyze all the S.C.s inside a Directory Ignoring all prior Warnings:
```sh
slither . --triage
```
- See all the prior Warnings Again:
```sh
rm slither.db.json
```

:hammer_and_wrench: For a More Detailed Audit of the Solidity Smart Contracts, you can Install and Use Mythril Analyzer:
- Installation:
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup default nightly
pip3 install mythril
myth version
```
### Usage:
Run:
```sh
myth analyze <solidity-file>
```
Or:
```sh
myth analyze -a <contract-address>
```

## :hammer_and_wrench:Auditing Approach:
- Read about the project in its Documentation and Talk to its Developers if Possible to get an idea of what the Smart Contracts are meant to do.
- Look over the Smart Contracts to get an idea of the Smart Contracts Architecture.
- Create a threat model and make a list of theoretical attack vectors including all common pitfalls and past exploit techniques. Tools like Slither and Mythrill can help with this.
- Look at places that can do value exchange. Especially functions like transfer, transferFrom, send, call, delegatecall, and selfdestruct. Walk backward from them to ensure they are secured properly.
- Do a line-by-line review of the contracts.
- Do another review from the perspective of every actor in your threat model.
- Glance over the test cases and code coverage.

## Deploying the Project to the Mumbai TestNet:

:five: Deploy the Smart Contract to the Mumbai Polygon Test Network(https://hardhat.org/tutorial/deploying-to-a-live-network.html):

```sh
npx hardhat run scripts/deploy.js --network mumbai
```

## Deploying the Project to the Polygon MainNet:

:six: Deploy the Smart Contract to the Polygon Main Network(https://hardhat.org/tutorial/deploying-to-a-live-network.html):

```sh
npx hardhat run scripts/deploy.js --network polygon
```

:seven: To Interact with the Deployed S.C. you need to run contract-interact.js:

```sh
node scripts/contract-interact.js
```

:eight: Verify your smart contract on PolygonScan:

```sh
npx hardhat verify --network mumbai DEPLOYED_SMART_CONTRACT_ADDRESS_MUMBAI 'Hello World!'
```

## User Guide:

You can find detailed instructions on using this repository and many tips in [its documentation](https://hardhat.org/tutorial).

- [Setting up the environment](https://hardhat.org/tutorial/setting-up-the-environment.html)
- [Testing with Hardhat, Mocha and Waffle](https://hardhat.org/tutorial/testing-contracts.html)
- [Hardhat's full documentation](https://hardhat.org/getting-started/)

For a complete introduction to Hardhat, refer to [this guide](https://hardhat.org/getting-started/#overview).
