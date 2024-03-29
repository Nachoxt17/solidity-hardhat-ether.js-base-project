const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

async function advanceBlock() {
    return ethers.provider.send("evm_mine", [])
}

async function advanceMultipleBlocks(amount) {
    for (let index = 0; index < amount; index++) {
        await ethers.provider.send(
            "evm_mine",
            []
        );
    }
}

async function advanceBlockTo(blockNumber) {
    for (let i = await ethers.provider.getBlockNumber(); i < blockNumber; i++) {
        await advanceBlock()
    }
}

async function increaseTime(amount) { // in seconds
    await ethers.provider.send("evm_increaseTime", [amount])
    await advanceBlock()
}

async function latest() {
    const block = await ethers.provider.getBlock("latest")
    return BigNumber.from(block.timestamp)
}

async function advanceTimeAndBlock(time) {
    await advanceTime(time)
    await advanceBlock()
}

async function advanceTime(time) {
    await ethers.provider.send("evm_increaseTime", [time])
}

const duration = {
    seconds: function (val) {
        return BigNumber.from(val)
    },
    minutes: function (val) {
        return BigNumber.from(val).mul(this.seconds("60"))
    },
    hours: function (val) {
        return BigNumber.from(val).mul(this.minutes("60"))
    },
    days: function (val) {
        return BigNumber.from(val).mul(this.hours("24"))
    },
    weeks: function (val) {
        return BigNumber.from(val).mul(this.days("7"))
    },
    years: function (val) {
        return BigNumber.from(val).mul(this.days("365"))
    },
}

module.exports = {
    advanceTime: advanceTime,
    advanceMultipleBlocks: advanceMultipleBlocks,
    advanceBlockTo: advanceBlockTo,
    advanceTimeAndBlock: advanceTimeAndBlock,
    advanceBlock: advanceBlock,
    increaseTime: increaseTime,
    latest: latest,
    duration: duration
}
