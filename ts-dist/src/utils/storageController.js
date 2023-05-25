"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const keyfile_1 = require("../wallet/keyfile");
class StorageController {
    constructor() { }
    static getItem(path) {
        if (typeof window === "undefined" || window === null) {
            const LocalStorage = require('node-localstorage').LocalStorage;
            const localStorage = new LocalStorage(this.nodeStorageLocation);
            return localStorage.getItem(path);
        }
        else {
            return localStorage.getItem(path);
        }
    }
    static setItem(path, value) {
        if (typeof window === "undefined" || window === null) {
            const LocalStorage = require('node-localstorage').LocalStorage;
            const localStorage = new LocalStorage(this.nodeStorageLocation);
            return localStorage.setItem(path, value);
        }
        else {
            return localStorage.setItem(path, value);
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
        if (typeof window === "undefined" || window === null) {
            const LocalStorage = require('node-localstorage').LocalStorage;
            const localStorage = new LocalStorage(this.nodeStorageLocation);
            return localStorage.removeItem(path);
        }
        else {
            return localStorage.removeItem(path);
        }
    }
    static clear() {
        if (typeof window === "undefined" || window === null) {
            const LocalStorage = require('node-localstorage').LocalStorage;
            const localStorage = new LocalStorage(this.nodeStorageLocation);
            return localStorage.clear();
        }
        else {
            return localStorage.clear();
        }
    }
}
exports.StorageController = StorageController;
StorageController.nodeStorageLocation = './znn-local-storage';
