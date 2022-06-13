"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const keyfile_1 = require("../wallet/keyfile");
class StorageController {
    constructor() { }
    static getItem(path) {
        if (localStorage) {
            return localStorage.getItem(path);
        }
        else {
            throw new Error("LocalStorage is not available");
        }
    }
    static setItem(path, value) {
        try {
            localStorage.setItem(path, value);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    static findWalletItem(path, address) {
        try {
            let walletItems = this.getWalletAddresses(path);
            for (let key in walletItems) {
                if (key === address) {
                    let keyFile = keyfile_1.KeyFile.fromJson(walletItems[key]);
                    return keyFile;
                }
                else {
                    let keyFile = keyfile_1.KeyFile.fromJson(walletItems[key]);
                    if (keyFile.baseAddress?.toString() === address) {
                        return keyFile;
                    }
                }
            }
            return undefined;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    static getWalletAddresses(path) {
        try {
            return JSON.parse(this.getItem(path) || "{}") || {};
        }
        catch (e) {
            throw new Error(e);
        }
    }
    static addWalletAddress(path, address, value) {
        try {
            let walletItems = this.getWalletAddresses(path);
            walletItems[address] = value;
            this.setItem(path, JSON.stringify(walletItems));
        }
        catch (e) {
            throw new Error(e);
        }
    }
    static removeItem(path) {
        localStorage.removeItem(path);
    }
    static clear() {
        localStorage.clear();
    }
}
exports.StorageController = StorageController;
