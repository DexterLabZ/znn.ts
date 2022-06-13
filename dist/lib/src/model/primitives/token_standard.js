"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyZts = exports.qsrZts = exports.znnZts = exports.emptyTokenStandard = exports.qsrTokenStandard = exports.znnTokenStandard = exports.TokenStandard = void 0;
const bech32_1 = require("bech32");
class TokenStandard {
    constructor(core) {
        this.core = core;
    }
    toString() {
        return bech32_1.bech32.encode("zts", bech32_1.bech32.toWords(this.core));
    }
    static parse(str) {
        try {
            const { prefix, words } = bech32_1.bech32.decode(str);
            let extractedCore = Buffer.from(bech32_1.bech32.fromWords(words));
            if (prefix !== 'zts') {
                throw `prefix ${prefix} should be 'zts'`;
            }
            if (extractedCore.length !== 10) {
                throw `invalid length ${extractedCore.length}; should be 10`;
            }
            return new TokenStandard(extractedCore);
        }
        catch (e) {
            throw `failed to parse TokenStandard. ${e.toString()}`;
        }
    }
    getBytes() {
        return this.core;
    }
    static isTokenStandard(value) {
        return (value.constructor.name === 'TokenStandard');
    }
}
exports.TokenStandard = TokenStandard;
TokenStandard.prefix = 'zts';
TokenStandard.coreSize = 10;
const znnTokenStandard = 'zts1znnxxxxxxxxxxxxx9z4ulx';
exports.znnTokenStandard = znnTokenStandard;
const qsrTokenStandard = 'zts1qsrxxxxxxxxxxxxxmrhjll';
exports.qsrTokenStandard = qsrTokenStandard;
const emptyTokenStandard = 'zts1qqqqqqqqqqqqqqqqtq587y';
exports.emptyTokenStandard = emptyTokenStandard;
const znnZts = TokenStandard.parse(znnTokenStandard);
exports.znnZts = znnZts;
const qsrZts = TokenStandard.parse(qsrTokenStandard);
exports.qsrZts = qsrZts;
const emptyZts = TokenStandard.parse(emptyTokenStandard);
exports.emptyZts = emptyZts;
