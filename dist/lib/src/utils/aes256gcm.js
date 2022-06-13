"use strict";
// https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81
// Demo implementation of using `aes-256-gcm` with node.js's `crypto` lib.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aes256gcm = exports.arrayBufferToBuffer = exports.bufferToArrayBuffer = void 0;
const crypto_browserify_1 = __importDefault(require("crypto-browserify"));
function bufferToArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}
exports.bufferToArrayBuffer = bufferToArrayBuffer;
function arrayBufferToBuffer(ab) {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
exports.arrayBufferToBuffer = arrayBufferToBuffer;
const aes256gcm = (key, nonce) => {
    const ALGO = 'aes-256-gcm';
    // encrypt returns base64-encoded ciphertext
    const encrypt = (str) => {
        // The `iv` for a given key must be globally unique to prevent
        // against forgery attacks. `randomBytes` is convenient for
        // demonstration but a poor way to achieve this in practice.
        //
        const cipher = crypto_browserify_1.default.createCipheriv(ALGO, key, nonce);
        let aad = Buffer.from("zenon", 'utf8');
        cipher.setAAD(Buffer.concat([aad]));
        // Hint: Larger inputs (it's GCM, after all!) should use the stream API
        let enc = cipher.update(str, 'utf8', 'hex');
        enc += cipher.final('hex');
        enc += cipher.getAuthTag().toString('hex');
        return [enc, nonce];
    };
    // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
    const decrypt = (enc, iv, authTag) => {
        const decipher = crypto_browserify_1.default.createDecipheriv(ALGO, key, iv);
        decipher.setAAD(Buffer.from("zenon", 'utf8'));
        decipher.setAuthTag(authTag);
        let str = decipher.update(enc, undefined, 'hex');
        str += decipher.final('hex');
        return Buffer.from(str, 'hex');
    };
    return {
        encrypt,
        decrypt,
        bufferToArrayBuffer,
        arrayBufferToBuffer
    };
};
exports.aes256gcm = aes256gcm;
