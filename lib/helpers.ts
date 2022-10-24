import { ethers, network } from "hardhat";


export const getSignerFromAddress = async (address: any) => {
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [address],
    });
    await network.provider.send("hardhat_setBalance", [
        address,
        "0x10000000000000000000000000000",
    ]);
    const signer = await ethers.getSigner(address);

    return signer;

}

export async function advanceMultipleBlocks(amount: any) {
    for (let index = 0; index < amount; index++) {
        await ethers.provider.send("evm_mine", []);
    }
}
