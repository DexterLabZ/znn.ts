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
exports.KeyFile = void 0;
const address_1 = require("../model/primitives/address");
const keystore_1 = require("./keystore");
const argon2 = __importStar(require("argon2-browser"));
const aes256gcm_1 = require("./../utils/aes256gcm");
class KeyFile {
    constructor(baseAddress, crypto, timestamp, version) {
        this.baseAddress = baseAddress;
        this.crypto = crypto;
        this.timestamp = timestamp;
        this.version = version;
    }
    static async encrypt(store, password) {
        let timestamp = Math.floor(Date.now() / 1000);
        // ToDo: error handling
        const _baseAddress = await store.getKeyPair(0).getAddress();
        const _crypto = new _Crypto(new _Argon2Params(Buffer.alloc(0)), Buffer.alloc(0), 'aes-256-gcm', 'argon2.IDKey', Buffer.alloc(0));
        let stored = new KeyFile(_baseAddress, _crypto, timestamp, 1);
        let returned = await stored._encryptEntropy(store, password);
        return returned;
    }
    async decrypt(password) {
        if (!this.crypto) {
            throw new Error("No crypto data found");
        }
        let givenBaseAddress = this.baseAddress;
        let salt = this.crypto.argon2Params.salt.toString().substr(2);
        let encrypted = this.crypto.cipherData.toString().substr(2);
        let aesNonce = this.crypto.nonce.toString().substr(2);
        let key = await argon2.hash({
            pass: password,
            salt: Buffer.from(salt, 'hex'),
            time: 1,
            mem: 64 * 1024,
            hashLen: 32,
            type: argon2.ArgonType.Argon2id,
            parallelism: 4,
        });
        const aesCipher = (0, aes256gcm_1.aes256gcm)(key.hash, this.crypto.nonce);
        let entropy = aesCipher.decrypt(Buffer.from(encrypted.substr(0, encrypted.length - 32), 'hex'), Buffer.from(aesNonce, 'hex'), Buffer.from(encrypted.substr(encrypted.length - 32, 32), 'hex'));
        const kp = new keystore_1.KeyStore().fromEntropy(entropy.toString());
        let baseAddress = await kp.getKeyPair().getAddress();
        if (baseAddress.toString() !== givenBaseAddress?.toString()) {
            throw "invalid base address in keyFile";
        }
        return entropy;
    }
    async _encryptEntropy(store, password) {
        let salt = window.crypto.getRandomValues(Buffer.alloc(16));
        let nonce = window.crypto.getRandomValues(Buffer.alloc(12));
        // ToDo: error handling
        let key = await argon2.hash({
            pass: password,
            salt: salt,
            mem: 64 * 1024,
            time: 1,
            parallelism: 4,
            hashLen: 32,
            type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
        });
        const aesCipher = (0, aes256gcm_1.aes256gcm)(key.hash, nonce);
        let [encrypted, aesNonce] = aesCipher.encrypt(store.entropy);
        let keyFile = new KeyFile(this.baseAddress, new _Crypto(new _Argon2Params(Buffer.from("0x" + salt.toString('hex'))), Buffer.from("0x" + encrypted.toString('hex')), 'aes-256-gcm', 'argon2.IDKey', Buffer.from("0x" + aesNonce.toString('hex'))), Math.floor(Date.now() / 1000), 1);
        return keyFile;
    }
    static fromJson(json) {
        let data = {};
        if (json.baseAddress) {
            data.baseAddress = new address_1.Address(json.baseAddress.hrp, json.baseAddress.core);
        }
        if (json.crypto) {
            data.crypto = _Crypto.fromJson(json.crypto);
        }
        data.timestamp = json.timestamp;
        data.version = json.version;
        return new KeyFile(data.baseAddress, data.crypto, data.timestamp, data.version);
    }
    toJson() {
        let data = {};
        if (this.baseAddress) {
            data.baseAddress = this.baseAddress.toString();
        }
        if (this.crypto) {
            data.crypto = this.crypto.toJson();
        }
        ;
        data.timestamp = this.timestamp;
        data.version = this.version;
        return data;
    }
}
exports.KeyFile = KeyFile;
class _Crypto {
    constructor(argon2Params, cipherData, cipherName, kdf, nonce) {
        this.argon2Params = argon2Params;
        this.cipherData = cipherData;
        this.cipherName = cipherName;
        this.kdf = kdf;
        this.nonce = nonce;
    }
    static fromJson(json) {
        const data = {};
        if (json.argon2Params) {
            data.argon2Params = _Argon2Params.fromJson(json.argon2Params);
        }
        if (json.cipherData) {
            data.cipherData = Buffer.from(json.cipherData, 'hex');
        }
        if (json.cipherName) {
            data.cipherName = json.cipherName;
        }
        if (json.kdf) {
            data.kdf = json.kdf;
        }
        if (json.nonce) {
            data.nonce = Buffer.from(json.nonce, 'hex');
        }
        return new _Crypto(data.argon2Params, data.cipherData, data.cipherName, data.kdf, data.nonce);
    }
    toJson() {
        const data = {};
        if (this.argon2Params) {
            data.argon2Params = this.argon2Params.toJson();
        }
        if (this.cipherData) {
            data.cipherData = this.cipherData.toString('hex');
        }
        if (this.cipherName) {
            data.cipherName = this.cipherName;
        }
        if (this.kdf) {
            data.kdf = this.kdf;
        }
        if (this.nonce) {
            data.nonce = this.nonce.toString('hex');
        }
        return data;
    }
}
class _Argon2Params {
    constructor(salt) {
        this.salt = salt;
    }
    static fromJson(json) {
        return new _Argon2Params(Buffer.from(json.salt, 'hex'));
    }
    toJson() {
        let data = {};
        if (this.salt) {
            data.salt = this.salt.toString('hex');
        }
        return data;
    }
}
