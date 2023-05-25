"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityStakeEntry = exports.LiquidityStakeList = exports.LiquidityInfo = exports.TokenTuple = void 0;
const hash_1 = require("../primitives/hash");
const address_1 = require("../primitives/address");
const ethers_1 = require("ethers");
class TokenTuple {
    constructor(tokenStandard, znnPercentage, qsrPercentage, minAmount) {
        this.tokenStandard = tokenStandard;
        this.znnPercentage = znnPercentage;
        this.qsrPercentage = qsrPercentage;
        this.minAmount = minAmount;
    }
    static fromJson(json) {
        return new TokenTuple(json.tokenStandard, json.znnPercentage, json.qsrPercentage, ethers_1.ethers.BigNumber.from(json.minAmount));
    }
    toJson() {
        return {
            tokenStandard: this.tokenStandard,
            znnPercentage: this.znnPercentage,
            qsrPercentage: this.qsrPercentage,
            minAmount: this.minAmount?.toString(),
        };
    }
}
exports.TokenTuple = TokenTuple;
class LiquidityInfo {
    constructor(administratorPubKey, isHalted, tokenTuples) {
        this.administratorPubKey = administratorPubKey;
        this.isHalted = isHalted;
        this.tokenTuples = tokenTuples;
    }
    static fromJson(json) {
        return new LiquidityInfo(json.administratorPubKey, json.isHalted, json.tokenTuples?.map((entry) => TokenTuple.fromJson(entry)));
    }
    toJson() {
        return {
            administratorPubKey: this.administratorPubKey,
            isHalted: this.isHalted,
            tokenTuples: this.tokenTuples?.map((entry) => entry.toJson()),
        };
    }
}
exports.LiquidityInfo = LiquidityInfo;
class LiquidityStakeList {
    constructor(totalAmount, totalWeightedAmount, count, list) {
        this.totalAmount = totalAmount;
        this.totalWeightedAmount = totalWeightedAmount;
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new LiquidityStakeList(ethers_1.ethers.BigNumber.from(json.totalAmount), ethers_1.ethers.BigNumber.from(json.totalWeightedAmount), json.count, json.list?.map((entry) => LiquidityStakeEntry.fromJson(entry)));
    }
    toJson() {
        return {
            totalAmount: this.totalAmount?.toString(),
            totalWeightedAmount: this.totalWeightedAmount?.toString(),
            count: this.count,
            list: this.list?.map((entry) => entry.toJson()),
        };
    }
}
exports.LiquidityStakeList = LiquidityStakeList;
class LiquidityStakeEntry {
    constructor(amount, tokenStandard, weightedAmount, startTime, revokeTime, expirationTime, stakeAddress, id) {
        this.amount = amount;
        this.tokenStandard = tokenStandard;
        this.weightedAmount = weightedAmount;
        this.startTime = startTime;
        this.revokeTime = revokeTime;
        this.expirationTime = expirationTime;
        this.stakeAddress = stakeAddress;
        this.id = id;
    }
    static fromJson(json) {
        return new LiquidityStakeEntry(ethers_1.ethers.BigNumber.from(json.amount), json.tokenStandard, json.weightedAmount, json.startTime, json.revokeTime, json.expirationTime, address_1.Address.parse(json.stakeAddress), hash_1.Hash.parse(json.id));
    }
    toJson() {
        return {
            amount: this.amount?.toString(),
            tokenStandard: this.tokenStandard,
            weightedAmount: this.weightedAmount,
            startTime: this.startTime,
            revokeTime: this.revokeTime,
            expirationTime: this.expirationTime,
            stakeAddress: this.stakeAddress.toString(),
            id: this.id.toString(),
        };
    }
}
exports.LiquidityStakeEntry = LiquidityStakeEntry;
