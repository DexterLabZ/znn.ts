"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyHash = exports.Hash = void 0;
const crypto_1 = require("../../crypto/crypto");
const bytes_1 = require("../../utils/bytes");
class Hash {
    constructor(hash) {
        this.hash = hash;
    }
    static parse(hash) {
        if (hash.length != 2 * Hash._length) {
            throw Error('Invalid hash _length');
        }
        return new Hash(Buffer.from(hash, "hex"));
    }
    static async digest(data) {
        return new Hash(await crypto_1.Crypto.digest(data));
    }
    getBytes() {
        return this.hash;
    }
    toString() {
        return bytes_1.BytesUtils.bytesToHex(this.hash);
    }
}
exports.Hash = Hash;
Hash._length = 32;
exports.emptyHash = Hash.parse("0000000000000000000000000000000000000000000000000000000000000000");
