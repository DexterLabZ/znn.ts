"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyHashHeight = exports.HashHeight = void 0;
const bytes_1 = require("../../utils/bytes");
const hash_1 = require("./hash");
class HashHeight {
    constructor(hash, height) {
        this.hash = hash;
        this.height = height;
    }
    static fromJson(json) {
        return new HashHeight(hash_1.Hash.parse(json['hash']), json['height']);
    }
    toJson() {
        return {
            hash: this.hash?.toString() || hash_1.emptyHash.toString(),
            height: this.height
        };
    }
    toString() {
        return JSON.stringify(this.toJson());
    }
    getBytes() {
        return Buffer.concat([
            this.hash?.getBytes() || hash_1.emptyHash.getBytes(),
            bytes_1.BytesUtils.longToBytes(this.height)
        ]);
    }
}
exports.HashHeight = HashHeight;
exports.emptyHashHeight = new HashHeight(hash_1.emptyHash, 0);
