"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHeader = void 0;
const address_1 = require("../primitives/address");
const hash_1 = require("../primitives/hash");
class AccountHeader {
    constructor(address, hash, height) {
        this.address = address;
        this.hash = hash;
        this.height = height;
    }
    static fromJson(json) {
        return new AccountHeader(address_1.Address.parse(json['address']), hash_1.Hash.parse(json['hash']), json['height']);
    }
    toJson() {
        return {
            address: this.address?.toString(),
            hash: this.hash?.toString(),
            height: this.height
        };
    }
    toString() {
        return JSON.stringify(this.toJson());
    }
}
exports.AccountHeader = AccountHeader;
