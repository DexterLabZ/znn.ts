"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyStore = void 0;
const english_1 = require("@scure/bip39/wordlists/english");
const bip39_1 = require("@scure/bip39");
const ethers_1 = require("ethers");
const keypair_1 = require("./keypair");
const derivation_1 = require("./derivation");
const crypto_1 = require("./../crypto/crypto");
class KeyStore {
    constructor() {
        return this;
    }
    fromMnemonic(mnemonic) {
        this.setMnemonic(mnemonic);
        return this;
    }
    fromSeed(seed) {
        this.setSeed(seed);
        return this;
    }
    fromEntropy(entropy) {
        this.setEntropy(entropy);
        return this;
    }
    static async newRandom() {
        return new Promise((resolve, reject) => {
            try {
                let entropy = Buffer.from(ethers_1.ethers.utils.randomBytes(32));
                resolve(new KeyStore().fromEntropy(entropy.toString('hex')));
            }
            catch (e) {
                reject(e);
                throw Error(e.toString());
            }
        });
    }
    setMnemonic(mnemonic) {
        if (!(0, bip39_1.validateMnemonic)(mnemonic, english_1.wordlist)) {
            throw Error("Invalid mnemonic !");
        }
        this.mnemonic = mnemonic;
        this.entropy = Buffer.from((0, bip39_1.mnemonicToEntropy)(this.mnemonic, english_1.wordlist)).toString('hex');
        this.seed = Buffer.from((0, bip39_1.mnemonicToSeedSync)(this.mnemonic)).toString('hex');
    }
    setSeed(seed) {
        this.seed = seed;
    }
    setEntropy(entropy) {
        this.setMnemonic((0, bip39_1.entropyToMnemonic)(new Uint8Array(Buffer.from(entropy, 'hex')), english_1.wordlist));
    }
    getKeyPair(index = 0) {
        const derivationAccount = derivation_1.Derivation.getDerivationAccount(index);
        const derivedKey = crypto_1.Crypto.deriveKey(derivationAccount, this.seed);
        return new keypair_1.KeyPair(derivedKey);
    }
}
exports.KeyStore = KeyStore;
