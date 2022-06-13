"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PillarApi = void 0;
const constants_1 = require("../../client/constants");
const definitions_1 = require("../../embedded/definitions");
const common_1 = require("../../model/embedded/common");
const pillar_1 = require("../../model/embedded/pillar");
const account_block_template_1 = require("../../model/nom/account_block_template");
const address_1 = require("../../model/primitives/address");
const token_standard_1 = require("../../model/primitives/token_standard");
const constants_2 = require("./constants");
class PillarApi {
    setClient(client) {
        this.client = client;
    }
    // 
    // Common RPC
    // 
    async getDepositedQsr(address) {
        return await this.client.sendRequest('embedded.pillar.getDepositedQsr', [address.toString()]);
    }
    async getUncollectedReward(address) {
        const response = await this.client.sendRequest('embedded.pillar.getUncollectedReward', [address.toString()]);
        // ToDo: Add response validation
        // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
        return common_1.UncollectedReward.fromJson(response);
    }
    async getFrontierRewardByPage(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.pillar.getFrontierRewardByPage', [address.toString(), pageIndex, pageSize]);
        // ToDo: Add response validation
        // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
        return common_1.RewardHistoryList.fromJson(response);
    }
    // 
    // RPC
    // 
    async getQsrRegistrationCost() {
        // ToDo: Add response validation
        return await this.client.sendRequest('embedded.pillar.getQsrRegistrationCost', []);
    }
    async getAll(pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.pillar.getAll', [pageIndex, pageSize]);
        // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
        return pillar_1.PillarInfoList.fromJson(response);
    }
    async getByOwner(address) {
        const response = await this.client.sendRequest('embedded.pillar.getByOwner', [address.toString()]);
        // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
        return response.map((entry) => pillar_1.PillarInfo.fromJson(entry));
    }
    async getByName(name) {
        const response = await this.client.sendRequest('embedded.pillar.getByName', [name]);
        return response == null ? null : pillar_1.PillarInfo.fromJson(response);
    }
    async checkNameAvailability(name) {
        const response = await this.client.sendRequest('embedded.pillar.checkNameAvailability', [name]);
        return response;
    }
    async getDelegatedPillar(address) {
        const response = await this.client.sendRequest('embedded.pillar.getDelegatedPillar', [address.toString()]);
        // ToDo: Add response validation. Currently only returns null on many addresses
        return response == null ? null : pillar_1.DelegationInfo.fromJson(response);
    }
    async getPillarsHistoryByEpoch(epoch, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.pillar.getPillarsHistoryByEpoch', [epoch, pageIndex, pageSize]);
        // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
        return pillar_1.PillarEpochHistoryList.fromJson(response);
    }
    // 
    // Contract methods
    // 
    register(
    // ToDo: Add response validation
    name, producerAddress, rewardAddress, giveBlockRewardPercentage = 0, giveDelegateRewardPercentage = 100) {
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, constants_2.pillarRegisterZnnAmount, definitions_1.Definitions.pillar.encodeFunction("Register", [
            name,
            producerAddress,
            rewardAddress,
            giveBlockRewardPercentage,
            giveDelegateRewardPercentage
        ]));
    }
    registerLegacy(
    // ToDo: Add response validation
    name, producerAddress, rewardAddress, publicKey, signature, giveBlockRewardPercentage = 0, giveDelegateRewardPercentage = 100) {
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, constants_2.pillarRegisterZnnAmount, definitions_1.Definitions.pillar.encodeFunction("RegisterLegacy", [
            name,
            producerAddress,
            rewardAddress,
            giveBlockRewardPercentage,
            giveDelegateRewardPercentage,
            publicKey,
            signature
        ]));
    }
    updatePillar(
    // ToDo: Add response validation
    name, producerAddress, rewardAddress, giveBlockRewardPercentage = 0, giveDelegateRewardPercentage = 100) {
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.pillar.encodeFunction("UpdatePillar", [
            name,
            producerAddress,
            rewardAddress,
            giveBlockRewardPercentage,
            giveDelegateRewardPercentage,
        ]));
    }
    revoke(name) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.pillar.encodeFunction("Revoke", [name]));
    }
    delegate(name) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.pillar.encodeFunction("Delegate", [name]));
    }
    undelegate() {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.pillar.encodeFunction("Undelegate", []));
    }
    // Common contract methods
    collectReward() {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.common.encodeFunction("CollectReward", []));
    }
    depositQsr(amount) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, amount, definitions_1.Definitions.common.encodeFunction("DepositQsr", []));
    }
    withdrawQsr() {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.pillarAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.common.encodeFunction("WithdrawQsr", []));
    }
}
exports.PillarApi = PillarApi;
