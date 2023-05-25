"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationInfo = exports.PillarEpochHistoryList = exports.PillarEpochHistory = exports.PillarEpochStats = exports.PillarInfoList = exports.PillarInfo = void 0;
const amount_1 = require("../../utils/amount");
const address_1 = require("../primitives/address");
const ethers_1 = require("ethers");
class PillarInfo {
    constructor(name, rank, type, ownerAddress, producerAddress, withdrawAddress, giveMomentumRewardPercentage, giveDelegateRewardPercentage, isRevocable, revokeCooldown, revokeTimestamp, currentStats, weight) {
        this.name = name;
        this.rank = rank;
        this.type = type;
        this.ownerAddress = ownerAddress;
        this.producerAddress = producerAddress;
        this.withdrawAddress = withdrawAddress;
        this.giveMomentumRewardPercentage = giveMomentumRewardPercentage;
        this.giveDelegateRewardPercentage = giveDelegateRewardPercentage;
        this.isRevocable = isRevocable;
        this.revokeCooldown = revokeCooldown;
        this.revokeTimestamp = revokeTimestamp;
        this.currentStats = currentStats;
        this.weight = weight;
    }
    static fromJson(json) {
        return new PillarInfo(json.name, json.rank, json.type ?? PillarInfo.unknownType, address_1.Address.parse(json.ownerAddress), address_1.Address.parse(json.producerAddress), address_1.Address.parse(json.withdrawAddress), json.giveMomentumRewardPercentage, json.giveDelegateRewardPercentage, json.isRevocable, json.revokeCooldown, json.revokeTimestamp, PillarEpochStats.fromJson(json.currentStats), ethers_1.ethers.BigNumber.from(json.weight.toString()));
    }
    toJson() {
        return {
            name: this.name,
            rank: this.rank,
            type: this.type,
            ownerAddress: this.ownerAddress.toString(),
            producerAddress: this.producerAddress.toString(),
            withdrawAddress: this.withdrawAddress.toString(),
            giveMomentumRewardPercentage: this.giveMomentumRewardPercentage,
            giveDelegateRewardPercentage: this.giveDelegateRewardPercentage,
            isRevocable: this.isRevocable,
            revokeCooldown: this.revokeCooldown,
            revokeTimestamp: this.revokeTimestamp,
            currentStats: this.currentStats.toJson(),
            weight: this.weight.toString(),
        };
    }
}
exports.PillarInfo = PillarInfo;
PillarInfo.unknownType = 0;
PillarInfo.legacyPillarType = 1;
PillarInfo.regularPillarType = 1;
class PillarInfoList {
    constructor(count, list) {
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new PillarInfoList(json.count, json.list.map(PillarInfo.fromJson));
    }
    toJson() {
        return {
            count: this.count,
            list: this.list.map((pillarInfo) => pillarInfo.toJson()),
        };
    }
}
exports.PillarInfoList = PillarInfoList;
class PillarEpochStats {
    constructor(producedMomentums, expectedMomentums) {
        this.producedMomentums = producedMomentums;
        this.expectedMomentums = expectedMomentums;
    }
    static fromJson(json) {
        return new PillarEpochStats(json.producedMomentums, json.expectedMomentums);
    }
    toJson() {
        return {
            producedMomentums: this.producedMomentums,
            expectedMomentums: this.expectedMomentums,
        };
    }
}
exports.PillarEpochStats = PillarEpochStats;
class PillarEpochHistory {
    constructor(name, epoch, giveBlockRewardPercentage, giveDelegateRewardPercentage, producedBlockNum, expectedBlockNum, weight) {
        this.name = name;
        this.epoch = epoch;
        this.giveBlockRewardPercentage = giveBlockRewardPercentage;
        this.giveDelegateRewardPercentage = giveDelegateRewardPercentage;
        this.producedBlockNum = producedBlockNum;
        this.expectedBlockNum = expectedBlockNum;
        this.weight = weight;
    }
    static fromJson(json) {
        return new PillarEpochHistory(json.name, json.epoch, json.giveBlockRewardPercentage, json.giveDelegateRewardPercentage, json.producedBlockNum, json.expectedBlockNum, ethers_1.ethers.BigNumber.from(json.weight.toString()));
    }
    toJson() {
        return {
            name: this.name,
            epoch: this.epoch,
            giveBlockRewardPercentage: this.giveBlockRewardPercentage,
            giveDelegateRewardPercentage: this.giveDelegateRewardPercentage,
            producedBlockNum: this.producedBlockNum,
            expectedBlockNum: this.expectedBlockNum,
            weight: this.weight.toString(),
        };
    }
}
exports.PillarEpochHistory = PillarEpochHistory;
class PillarEpochHistoryList {
    constructor(count, list) {
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new PillarEpochHistoryList(json.count, json.list.map(PillarEpochHistory.fromJson));
    }
    toJson() {
        return {
            count: this.count,
            list: this.list.map((pillarEpochHistory) => pillarEpochHistory.toJson()),
        };
    }
}
exports.PillarEpochHistoryList = PillarEpochHistoryList;
class DelegationInfo {
    constructor(name, status, weight) {
        this.name = name;
        this.status = status;
        this.weight = weight;
        this.weightWithDecimals = amount_1.AmountUtils.addDecimals(weight, 8);
    }
    static fromJson(json) {
        return new DelegationInfo(json.name, json.status, ethers_1.ethers.BigNumber.from(json.weight.toString()));
    }
    toJson() {
        return {
            name: this.name,
            status: this.status,
            weight: this.weight.toString(),
        };
    }
    isPillarActive() {
        return this.status == 1;
    }
}
exports.DelegationInfo = DelegationInfo;
