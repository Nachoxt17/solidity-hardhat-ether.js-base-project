import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "hardhat-spdx-license-identifier";

import { envConfig } from "./config/envs";
import { chainIds } from "./config/networks";

function createEthereumNetworkConfig(network: keyof typeof chainIds): NetworkUserConfig {
    const url: string = `https://eth-${network}.g.alchemy.com/v2/${envConfig.crypto.ETH_MAINNET_ALCHEMY_API_KEY}`;
    let networkConfig: NetworkUserConfig = {
        chainId: chainIds[network],
        url,
    };
    const pk: string = envConfig.crypto.ETH_MAINNET_PRIVATE_KEY;
    if (pk != "") {
        networkConfig.accounts = [pk];
    }
    return networkConfig;
}

const hardhatConfig: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
            // used in unit tests.
            chainId: chainIds.hardhat,
            forking: {
                url: `https://eth-mainnet.g.alchemy.com/v2/${envConfig.crypto.ETH_MAINNET_ALCHEMY_API_KEY}`,
                blockNumber:
                15269796,
            },
        },
        localhost: {
            allowUnlimitedContractSize: true,
            chainId: chainIds.hardhat,
        },
        mainnet: createEthereumNetworkConfig("mainnet"),
        sepolia: createEthereumNetworkConfig("sepolia"),
    },
    solidity: {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
    },
    gasReporter: {
        enabled: true,
        showMethodSig: true,
        showTimeSpent: true,
    },
    abiExporter: {
        path: "./abis",
        runOnCompile: true,
        clear: true,
        flat: true,
        spacing: 2,
    },
};

export default hardhatConfig;
