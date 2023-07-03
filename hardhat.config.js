import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
require("dotenv").config();

import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "hardhat-spdx-license-identifier";
import 'solidity-coverage';

import { envConfig } from "./config/envs";
import { chainIds } from "./config/networks";

function createEthereumNetworkConfig(network: keyof typeof chainIds): NetworkUserConfig {
    const url: string = `https://eth-${network}.alchemyapi.io/v2/${envConfig.crypto.ALCHEMY_KEY}`;
    let networkConfig: NetworkUserConfig = {
        chainId: chainIds[network],
        url,
    };
    const pk: string = envConfig.crypto.PRIVATE_KEY;
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
                url: `https://eth-mainnet.alchemyapi.io/v2/${envConfig.crypto.ALCHEMY_KEY}`,
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
    solidity: {compilers: [
            {version: '0.5.12',},
            {version: "0.6.12"},
            {version: "0.7.6"},
            {version: '0.8.0',},
            {version: '0.8.4',},
            {version: '0.8.9',},
            {
                version: "0.8.12",
                settings: {
                    evmVersion: 'istanbul',
                    optimizer: {
                        enabled: true,
                        runs: 1_000_000,
                    },
                    metadata: {
                        bytecodeHash: 'none',
                    },
                    outputSelection: {
                        "*": {
                            "*": ["storageLayout"]
                        }
                    }
                },
            },
        ],
        settings: {
            outputSelection: {
                "*": {
                "*": ["storageLayout"]
                }
            }
        },},
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
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
    dodoc: {
        runOnCompile: false
    }
};

export default hardhatConfig;
