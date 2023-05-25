"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPair = void 0;
const address_1 = require("../model/primitives/address");
const crypto_1 = require("../crypto/crypto");
class KeyPair {
    constructor(privateKey, publicKey, address) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this._address = address;
    }
    async generateKeyPair(privateKey) {
        if (privateKey)
            this.privateKey = privateKey;
        this._address = await this.getAddress();
        return this;
    }
    getPrivateKey() {
        return this.privateKey;
    }
    async getPublicKey() {
        this.publicKey ?? (this.publicKey = await crypto_1.Crypto.getPublicKey(this.privateKey));
        return this.publicKey;
    }
    async getAddress() {
        if (this._address == undefined) {
            this.publicKey = await this.getPublicKey();
            this._address = address_1.Address.fromPublicKey(this.publicKey);
        }
        return this._address;
    }
    async sign(message) {
        const signed = await crypto_1.Crypto.sign(message, this.privateKey, (await this.getPublicKey()));
        return signed;
    }
}
exports.KeyPair = KeyPair;
