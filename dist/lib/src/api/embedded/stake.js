"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeApi = void 0;
const constants_1 = require("../../client/constants");
const definitions_1 = require("../../embedded/definitions");
const common_1 = require("../../model/embedded/common");
const stake_1 = require("../../model/embedded/stake");
const account_block_template_1 = require("../../model/nom/account_block_template");
const address_1 = require("../../model/primitives/address");
const token_standard_1 = require("../../model/primitives/token_standard");
class StakeApi {
    setClient(client) {
        this.client = client;
    }
    // 
    // RPC
    // 
    async getEntriesByAddress(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.stake.getEntriesByAddress', [address.toString(), pageIndex, pageSize]);
        // ToDo: Add response validation
        return stake_1.StakeList.fromJson(response);
    }
    async getUncollectedReward(address) {
        const response = await this.client.sendRequest('embedded.stake.getUncollectedReward', [address.toString()]);
        // ToDo: Add response validation
        return common_1.UncollectedReward.fromJson(response);
    }
    async getFrontierRewardByPage(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.stake.getFrontierRewardByPage', [address.toString(), pageIndex, pageSize]);
        // ToDo: Add response validation
        return common_1.RewardHistoryList.fromJson(response);
    }
    // Contract methods
    stake(durationInSec, amount) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.stakeAddress, token_standard_1.znnZts, amount, definitions_1.Definitions.stake.encodeFunction("Stake", [durationInSec]));
    }
    cancel(id) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.stakeAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.stake.encodeFunction("Cancel", [id.getBytes()]));
    }
    // Common contract methods
    collectReward() {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.stakeAddress, token_standard_1.znnZts, 0, definitions_1.Definitions.common.encodeFunction("CollectReward", []));
    }
}
exports.StakeApi = StakeApi;
