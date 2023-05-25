"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityApi = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../../client/constants");
const definitions_1 = require("../../embedded/definitions");
const common_1 = require("../../model/embedded/common");
const liquidity_1 = require("../../model/embedded/liquidity");
const account_block_template_1 = require("../../model/nom/account_block_template");
const address_1 = require("../../model/primitives/address");
const token_standard_1 = require("../../model/primitives/token_standard");
class LiquidityApi {
    setClient(client) {
        this.client = client;
    }
    //
    // RPC
    //
    async getLiquidityInfo() {
        const response = await this.client.sendRequest("embedded.liquidity.getLiquidityInfo", []);
        // ToDo: Add response validation
        return liquidity_1.LiquidityInfo.fromJson(response);
    }
    async getLiquidityStakeEntriesByAddress(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest("embedded.liquidity.getLiquidityStakeEntriesByAddress", [
            address.toString(),
            pageIndex,
            pageSize,
        ]);
        // ToDo: Add response validation
        return liquidity_1.LiquidityStakeList.fromJson(response);
    }
    async getUncollectedReward(address) {
        const response = await this.client.sendRequest("embedded.liquidity.getUncollectedReward", [address.toString()]);
        // ToDo: Add response validation
        return common_1.UncollectedReward.fromJson(response);
    }
    async getFrontierRewardByPage(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest("embedded.liquidity.getFrontierRewardByPage", [
            address.toString(),
            pageIndex,
            pageSize,
        ]);
        // ToDo: Add response validation
        return common_1.RewardHistoryList.fromJson(response);
    }
    // Contract methods
    liquidityStake(durationInSec, zts, amount) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.liquidityAddress, zts, amount, definitions_1.Definitions.liquidity.encodeFunction("LiquidityStake", [durationInSec]));
    }
    cancelLiquidityStake(id) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.liquidityAddress, token_standard_1.znnZts, ethers_1.ethers.BigNumber.from("0"), definitions_1.Definitions.liquidity.encodeFunction("CancelLiquidityStake", [id.getBytes()]));
    }
    // Common contract methods
    collectReward() {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.liquidityAddress, token_standard_1.znnZts, ethers_1.ethers.BigNumber.from("0"), definitions_1.Definitions.common.encodeFunction("CollectReward", []));
    }
}
exports.LiquidityApi = LiquidityApi;
