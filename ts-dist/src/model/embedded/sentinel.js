"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentinelInfoList = exports.SentinelInfo = void 0;
const address_1 = require("../primitives/address");
class SentinelInfo {
    constructor(owner, registrationTimestamp, isRevocable, revokeCooldown, active) {
        this.owner = owner;
        this.registrationTimestamp = registrationTimestamp;
        this.isRevocable = isRevocable;
        this.revokeCooldown = revokeCooldown;
        this.active = active;
    }
    static fromJson(json) {
        return new SentinelInfo(address_1.Address.parse(json.owner), json.registrationTimestamp, json.isRevocable, json.revokeCooldown, json.active);
    }
    toJson() {
        return {
            owner: this.owner.toString(),
            registrationTimestamp: this.registrationTimestamp,
            isRevocable: this.isRevocable,
            revokeCooldown: this.revokeCooldown,
            active: this.active
        };
    }
}
exports.SentinelInfo = SentinelInfo;
class SentinelInfoList {
    constructor(count, list) {
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new SentinelInfoList(json.count, json.list.map((entry) => SentinelInfo.fromJson(entry)));
    }
    toJson() {
        return {
            count: this.count,
            list: this.list.map((entry) => entry.toJson())
        };
    }
}
exports.SentinelInfoList = SentinelInfoList;
