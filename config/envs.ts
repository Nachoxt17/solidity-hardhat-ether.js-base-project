require("dotenv").config();

const envConfig = {
    crypto: {
        ETH_MAINNET_ALCHEMY_API_KEY: process.env.ALCHEMY_KEY || "",
        ETHERSCAN_KEY: process.env.ETHERSCAN_KEY || "",
        ETH_MAINNET_PRIVATE_KEY: process.env.ETH_MAINNET_PRIVATE_KEY || "",
    },
}

export { envConfig };
