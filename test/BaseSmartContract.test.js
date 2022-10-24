import { assert } from "chai";
import { ethers, network } from "hardhat";
import { envConfig } from "../config/envs";
const { DAI, DAI_WHALE, USDC, USDC_WHALE, USDT } = require("./ParametersConfig.js");
let daiToken: any, usdcToken: any, usdtToken: any, baseSmartContract: any, admin: any, user1: any;

describe("BaseSmartContract deployment", function () {
  const DECIMALS = 6;//-(Decimals for USDC and USDT. DAI has 18 Decimals).

  before(async () => {
    const url = `https://eth-mainnet.alchemyapi.io/v2/${envConfig.crypto.ALCHEMY_KEY}`;
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: url,
            blockNumber: /**14390000*/15269796,
          },
        },
      ],
    });

    admin = await ethers.getImpersonatedSigner(USDC_WHALE);
    user1 = await ethers.getImpersonatedSigner(DAI_WHALE);

    daiToken = await ethers.getContractAt("IERC20", DAI, admin);
    usdcToken = await ethers.getContractAt("IERC20", USDC, admin);
    usdtToken = await ethers.getContractAt("IERC20", USDT, admin);

    let BaseSmartContract = await ethers.getContractFactory("BaseSmartContract");
    baseSmartContract = await BaseSmartContract.deploy();
  });

  it("Contract has a Name", async () => {
    let name = await baseSmartContract.name();
    
    assert.equal(name, "SampleSmartContract", "It doesn't shows Name");
    
    console.log(`Smart Contract Name: {name}`);
  });
});
