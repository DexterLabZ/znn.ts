"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeEntry = exports.StakeList = void 0;
const hash_1 = require("../primitives/hash");
const address_1 = require("../primitives/address");
const ethers_1 = require("ethers");
class StakeList {
    constructor(totalAmount, totalWeightedAmount, count, list) {
        this.totalAmount = totalAmount;
        this.totalWeightedAmount = totalWeightedAmount;
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new StakeList(json.totalAmount, json.totalWeightedAmount, json.count, json.list.map((entry) => StakeEntry.fromJson(entry)));
    }
    toJson() {
        return {
            totalAmount: this.totalAmount.toString(),
            totalWeightedAmount: this.totalWeightedAmount.toString(),
            count: this.count,
            list: this.list.map((entry) => entry.toJson()),
        };
    }
}
exports.StakeList = StakeList;
class StakeEntry {
    constructor(amount, weightedAmount, startTimestamp, expirationTimestamp, address, id) {
        this.amount = amount;
        this.weightedAmount = weightedAmount;
        this.startTimestamp = startTimestamp;
        this.expirationTimestamp = expirationTimestamp;
        this.address = address;
        this.id = id;
    }
    static fromJson(json) {
        return new StakeEntry(ethers_1.ethers.BigNumber.from(json.amount.toString()), ethers_1.ethers.BigNumber.from(json.weightedAmount.toString()), json.startTimestamp, json.expirationTimestamp, address_1.Address.parse(json.address), hash_1.Hash.parse(json.id));
    }
    toJson() {
        return {
            amount: this.amount.toString(),
            weightedAmount: this.weightedAmount.toString(),
            startTimestamp: this.startTimestamp,
            expirationTimestamp: this.expirationTimestamp,
            address: this.address.toString(),
            id: this.id.toString(),
        };
    }
}
exports.StakeEntry = StakeEntry;
