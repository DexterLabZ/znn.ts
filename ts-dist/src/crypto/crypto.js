"use strict";
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
exports.Crypto = void 0;
const ed25519_hd_key_1 = require("ed25519-hd-key");
const ed = __importStar(require("@noble/ed25519"));
const { SHA3 } = require('sha3');
class Crypto {
    static getPublicKey(privateKey) {
        return new Promise((resolve, reject) => {
            resolve((0, ed25519_hd_key_1.getPublicKey)(privateKey, false));
        });
    }
    static deriveKey(path, seed) {
        return (0, ed25519_hd_key_1.derivePath)(path, seed).key;
    }
    static async sign(message, privateKey, publicKey) {
        return Buffer.from(await ed.sign(message, privateKey.toString('hex')));
    }
    static async digest(data, digestSize = 32) {
        return SHA3(256).update(data).digest();
    }
}
exports.Crypto = Crypto;
