"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentinelApi = void 0;
const constants_1 = require("../../client/constants");
const definitions_1 = require("../../embedded/definitions");
const common_1 = require("../../model/embedded/common");
const sentinel_1 = require("../../model/embedded/sentinel");
const account_block_template_1 = require("../../model/nom/account_block_template");
const address_1 = require("../../model/primitives/address");
const token_standard_1 = require("../../model/primitives/token_standard");
const constants_2 = require("./constants");
class SentinelApi {
    setClient(client) {
        this.client = client;
    }
    // 
    // RPC
    // 
    async getAllActive(pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.sentinel.getAllActive', [pageIndex, pageSize]);
        // ToDo: Add response validation
        return sentinel_1.SentinelInfoList.fromJson(response);
    }
    async getByOwner(owner) {
        const response = await this.client.sendRequest('embedded.sentinel.getByOwner', [owner.toString()]);
        // ToDo: Add response validation
        return response == null ? response : sentinel_1.SentinelInfo.fromJson(response);
    }
    // 
    // Common RPC
    // 
    async getDepositedQsr(address) {
        const response = await this.client.sendRequest('embedded.sentinel.getDepositedQsr', [address.toString()]);
        // ToDo: Add response validation
        return response;
    }
    async getUncollectedReward(address) {
        const response = await this.client.sendRequest('embedded.sentinel.getUncollectedReward', [address.toString()]);
        // ToDo: Add response validation
        return response;
    }
    async getFrontierRewardByPage(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.sentinel.getFrontierRewardByPage', [address.toString(), pageIndex, pageSize]);
        // ToDo: Add response validation
        return common_1.RewardHistoryList.fromJson(response);
    }
    // Contract methods
    async register() {
        // ToDo: Add response validation!
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.sentinelAddress, token_standard_1.znnZts, constants_2.sentinelRegisterZnnAmount, definitions_1.Definitions.sentinel.encodeFunction('Register', []));
    }
    async revoke() {
        // ToDo: Add response validation!
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.sentinelAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.sentinel.encodeFunction('Revoke', []));
    }
    // Common contract methods
    async collectRewards() {
        // ToDo: Add response validation!
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.sentinelAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.common.encodeFunction('CollectReward', []));
    }
    async depositQsr(amount) {
        // ToDo: Add response validation!
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.sentinelAddress, token_standard_1.znnZts, amount, definitions_1.Definitions.common.encodeFunction('DepositQsr', []));
    }
    async withdrawQsr() {
        // ToDo: Add response validation!
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.sentinelAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.common.encodeFunction('WithdrawQsr', []));
    }
}
exports.SentinelApi = SentinelApi;
