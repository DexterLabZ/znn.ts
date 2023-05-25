"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = exports.bridgeContractAddress = exports.acceleratorAddress = exports.sporkAddress = exports.liquidityAddress = exports.stakeAddress = exports.swapAddress = exports.sentinelAddress = exports.tokenAddress = exports.pillarAddress = exports.plasmaAddress = exports.emptyAddress = void 0;
const { SHA3 } = require('sha3');
let { bech32 } = require('bech32');
const SHA3_PADDING = [6, 1536, 393216, 100663296];
const NORMAL_BITS = [224, 256, 384, 512];
class Address {
    constructor(hrp, core) {
        this.hrp = hrp;
        this.core = core;
    }
    static parse(address) {
        const { prefix, words } = bech32.decode(address);
        let extractedCore = Buffer.from(bech32.fromWords(words));
        if (prefix !== Address.prefix) {
            throw `invalid prefix ${prefix}; should be Address.prefix`;
        }
        if (extractedCore.length !== 20) {
            throw `invalid length ${extractedCore.length}; should be 20`;
        }
        return new Address(prefix, extractedCore);
    }
    // @override
    toString() {
        return bech32.encode(this.hrp, bech32.toWords(Buffer.from(this.core)));
    }
    static fromPublicKey(publicKey) {
        let sha3 = new SHA3(NORMAL_BITS[1], SHA3_PADDING, SHA3_PADDING[1]);
        sha3.update(publicKey);
        let digest = sha3.digest().subarray(0, 19);
        return new Address(this.prefix, Buffer.concat([Buffer.from([this.userByte]), Buffer.from(digest)]));
    }
    getBytes() {
        return this.core;
    }
    static isAddress(value) {
        return (value.constructor.name === 'Address');
    }
}
exports.Address = Address;
Address.prefix = 'z';
Address.addressLength = 40;
Address.userByte = 0;
Address.contractByte = 1;
Address.coreSize = 20;
exports.emptyAddress = Address.parse('z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f');
exports.plasmaAddress = Address.parse('z1qxemdeddedxplasmaxxxxxxxxxxxxxxxxsctrp');
exports.pillarAddress = Address.parse('z1qxemdeddedxpyllarxxxxxxxxxxxxxxxsy3fmg');
exports.tokenAddress = Address.parse('z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0');
exports.sentinelAddress = Address.parse('z1qxemdeddedxsentynelxxxxxxxxxxxxxwy0r2r');
exports.swapAddress = Address.parse('z1qxemdeddedxswapxxxxxxxxxxxxxxxxxxl4yww');
exports.stakeAddress = Address.parse('z1qxemdeddedxstakexxxxxxxxxxxxxxxxjv8v62');
exports.liquidityAddress = Address.parse('z1qxemdeddedxlyquydytyxxxxxxxxxxxxflaaae');
exports.sporkAddress = Address.parse('z1qxemdeddedxsp0rkxxxxxxxxxxxxxxxx956u48');
exports.acceleratorAddress = Address.parse('z1qxemdeddedxaccelerat0rxxxxxxxxxxp4tk22');
exports.bridgeContractAddress = Address.parse('z1qxemdeddedxdrydgexxxxxxxxxxxxxxxmqgr0d');
