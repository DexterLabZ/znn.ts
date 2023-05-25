"use strict";
// https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81
// Demo implementation of using `aes-256-gcm` with node.js's `crypto` lib.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aes256gcm = exports.arrayBufferToBuffer = exports.bufferToArrayBuffer = void 0;
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
    const encrypt = async (str) => {
        // The `iv` for a given key must be globally unique to prevent
        // against forgery attacks. `randomBytes` is convenient for
        // demonstration but a poor way to achieve this in practice.
        //
        let crypto;
        if (typeof window === "undefined" || window === null) {
            // For node
            crypto = await Promise.resolve().then(() => __importStar(require("node:crypto")));
        }
        else {
            // For browser
            crypto = await Promise.resolve().then(() => __importStar(require("crypto-browserify")));
        }
        const cipher = crypto.createCipheriv(ALGO, key, nonce);
        let aad = Buffer.from("zenon", 'utf8');
        cipher.setAAD(Buffer.concat([aad]));
        // Hint: Larger inputs (it's GCM, after all!) should use the stream API
        let enc = cipher.update(str, 'utf8', 'hex');
        enc += cipher.final('hex');
        enc += cipher.getAuthTag().toString('hex');
        return [enc, nonce];
    };
    // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
    const decrypt = async (enc, iv, authTag) => {
        let crypto;
        if (typeof window === "undefined" || window === null) {
            // For node
            crypto = await Promise.resolve().then(() => __importStar(require("node:crypto")));
        }
        else {
            // For browser
            crypto = await Promise.resolve().then(() => __importStar(require("crypto-browserify")));
        }
        const decipher = crypto.createDecipheriv(ALGO, key, iv);
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
