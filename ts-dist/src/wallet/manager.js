"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyStoreManager = void 0;
const storageController_1 = require("../utils/storageController");
const keyfile_1 = require("./keyfile");
const keystore_1 = require("./keystore");
class SaveKeyStoreArguments {
    constructor(store, password, name) {
        this.store = store;
        this.password = password;
        this.name = name;
    }
}
const DEFAULT_WALLET_PATH = "wallet";
class KeyStoreManager {
    constructor() {
        this.walletPath = DEFAULT_WALLET_PATH;
    }
    async saveKeyStoreFunction(args) {
        this.saveKeyStore(args.store, args.password, args.name);
    }
    async saveKeyStore(store, password, name) {
        return new Promise(async (resolve, reject) => {
            if (name && typeof name == "string") {
                name = name.replace(" ", "-");
            }
            else {
                let keyPair = store.getKeyPair();
                let nameAdd = await keyPair.getAddress();
                name = nameAdd.toString();
            }
            let encryptedKeyFile = await keyfile_1.KeyFile.encrypt(store, password);
            try {
                storageController_1.StorageController.addWalletAddress(this.walletPath, name, encryptedKeyFile);
                resolve(this.walletPath + name);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    setKeyStore(keyStore) {
        this.keyStoreInUse = keyStore;
    }
    getMnemonicInUse() {
        if (!this.keyStoreInUse) {
            throw Error("The keystore is use is null");
        }
        return this.keyStoreInUse.mnemonic;
    }
    listAllKeyStores() {
        let keyStoreList = storageController_1.StorageController.getWalletAddresses(DEFAULT_WALLET_PATH);
        return keyStoreList;
    }
    async readKeyStore(password, keyName) {
        let keyFile = storageController_1.StorageController.findWalletItem(DEFAULT_WALLET_PATH, keyName);
        if (!keyFile) {
            throw Error("Given keyFile does not exist");
        }
        try {
            let content = await keyFile.decrypt(password);
            let keyStore = new keystore_1.KeyStore().fromEntropy(content.toString());
            return keyStore;
        }
        catch (e) {
            throw Error(`Error decrypting ${e}`);
        }
    }
    async createNew(passphrase, name) {
        let store = await keystore_1.KeyStore.newRandom();
        let keyStore = await this.saveKeyStore(store, passphrase, name);
        return keyStore;
    }
}
exports.KeyStoreManager = KeyStoreManager;
