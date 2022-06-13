"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteBreakdown = exports.RewardHistoryList = exports.RewardHistoryEntry = exports.UncollectedReward = void 0;
const address_1 = require("../primitives/address");
const hash_1 = require("./../primitives/hash");
class UncollectedReward {
    constructor(address, znnAmount, qsrAmount) {
        this.address = address;
        this.znnAmount = znnAmount;
        this.qsrAmount = qsrAmount;
    }
    static fromJson(json) {
        let address = address_1.Address.parse(json.address);
        let znnAmount = json.znnAmount;
        let qsrAmount = json.qsrAmount;
        return new UncollectedReward(address, znnAmount, qsrAmount);
    }
}
exports.UncollectedReward = UncollectedReward;
class RewardHistoryEntry {
    constructor(epoch, znnAmount, qsrAmount) {
        this.epoch = epoch;
        this.znnAmount = znnAmount;
        this.qsrAmount = qsrAmount;
    }
    static fromJson(json) {
        return new RewardHistoryEntry(json.epoch, json.znnAmount, json.qsrAmount);
    }
    toJson() {
        return {
            epoch: this.epoch,
            znnAmount: this.znnAmount,
            qsrAmount: this.qsrAmount
        };
    }
}
exports.RewardHistoryEntry = RewardHistoryEntry;
class RewardHistoryList {
    constructor(count, list) {
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new RewardHistoryList(json.count, json.list.map(RewardHistoryEntry.fromJson));
    }
    toJson() {
        return {
            count: this.count,
            list: this.list.map((entry) => entry.toJson())
        };
    }
}
exports.RewardHistoryList = RewardHistoryList;
class VoteBreakdown {
    constructor(yes, no, total, id) {
        this.yes = yes;
        this.no = no;
        this.total = total;
        this.id = id;
    }
    static fromJson(json) {
        let id = hash_1.Hash.parse(json.get("id"));
        let yes = json.get("yes");
        let no = json.get("no");
        let total = json.get("total");
        return new VoteBreakdown(yes, no, total, id);
    }
}
exports.VoteBreakdown = VoteBreakdown;