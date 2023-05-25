"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519 = void 0;
const utf8_1 = require("utf8");
const crypto_js_1 = __importDefault(require("crypto-js"));
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const create_hmac_1 = __importDefault(require("create-hmac"));
class KeyData {
    constructor(key, chainCode) {
        this.key = key;
        this.chainCode = chainCode;
    }
}
const ed25519Curve = 'ed25519 seed';
const HARDENED_OFFSET = 0x80000000;
const _curveBytes = (0, utf8_1.encode)(ed25519Curve);
const _pathRegex = new RegExp("^(m\/)?(\d+'?\/)*\d+'?$");
class Ed25519 {
    constructor() { }
    static getPublicKey(privateKey, withZeroByte = true) {
        const keyPair = tweetnacl_1.default.sign.keyPair.fromSeed(Uint8Array.from(privateKey));
        const signPk = keyPair.secretKey.subarray(32);
        const zero = Buffer.alloc(1, 0);
        return withZeroByte ?
            Buffer.concat([zero, Buffer.from(signPk)]) :
            Buffer.from(signPk);
    }
    ;
    static isValidPath(path) {
        if (!ed_utils.pathRegex.test(path)) {
            return false;
        }
        return !path
            .split('/')
            .slice(1)
            .map(ed_utils.replaceDerive)
            .some(isNaN);
    }
    ;
    static _getKeys(data, keyParameter) {
        const hmac = (0, create_hmac_1.default)('sha512', ed25519Curve);
        const I2 = hmac.update(Buffer.from(data)).digest();
        const IL = I2.toString('hex').slice(0, 32);
        const IR = I2.toString('hex').slice(32);
        return new KeyData(Buffer.from(IL), Buffer.from(IR));
    }
    static getMasterKeyFromSeed(seed) {
        let seedBytes = Buffer.from(seed, "hex");
        return this._getKeys(seedBytes, Buffer.from(_curveBytes));
    }
    ;
    // ToDo: replace any
    static derivePath(path, seed, offset = HARDENED_OFFSET) {
        if (!this.isValidPath(path)) {
            throw new Error('Invalid derivation path');
        }
        const { key, chainCode } = this.getMasterKeyFromSeed(seed);
        const segments = path
            .split('/')
            .slice(1)
            .map((val) => val.replace("'", ''))
            .map((el) => parseInt(el, 10));
        return segments.reduce((parentKeys, segment) => this.CKDPriv(parentKeys, segment + offset), {
            key,
            chainCode
        });
    }
    ;
    static CKDPriv_old({ key, chainCode }, index) {
        const indexBuffer = Buffer.alloc(4);
        indexBuffer.writeUInt32BE(index, 0);
        const data = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(key + ""), indexBuffer]);
        let hmacHasher = crypto_js_1.default.algo.SHA512.create();
        const I = hmacHasher.update(chainCode.toString()).update(data.toString('hex')).finalize();
        const IL = I.toString().slice(0, 32);
        const IR = I.toString().slice(32);
        return new KeyData(Buffer.from(IL), Buffer.from(IR));
    }
    ;
    static CKDPriv({ key, chainCode }, index) {
        const indexBuffer = Buffer.alloc(4);
        indexBuffer.writeUInt32BE(index, 0);
        const data = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(key + ""), indexBuffer]);
        const I = (0, create_hmac_1.default)('sha512', ed25519Curve)
            .update(data)
            .digest();
        const IL = I.slice(0, 32);
        const IR = I.slice(32);
        return {
            key: IL,
            chainCode: IR,
        };
    }
    ;
}
exports.Ed25519 = Ed25519;
class ed_utils {
    static replaceDerive(val) {
        return val.replace("'", "");
    }
}
ed_utils.pathRegex = new RegExp("^m(\\/[0-9]+')+$");
