import { KeyFile } from "../wallet/keyfile";

type StorageWallet = {
  [key: string]: KeyFile,
};
export class StorageController {
  static nodeStorageLocation: string = './znn-local-storage';
  constructor(){}
  
  static getItem(path: string): string | null | undefined {
    if (typeof window === "undefined" || window === null) {
      const LocalStorage = require('node-localstorage').LocalStorage;
      const localStorage = new LocalStorage(this.nodeStorageLocation);    
      return localStorage.getItem(path);
    }
    else{
      return localStorage.getItem(path);
    }
  }

  static setItem(path: string, value: string) {
    if (typeof window === "undefined" || window === null) {
      const LocalStorage = require('node-localstorage').LocalStorage;
      const localStorage = new LocalStorage(this.nodeStorageLocation);    
      return localStorage.setItem(path, value);
    }
    else{
      return localStorage.setItem(path, value);
    }
  }

  static findWalletItem(path: string, address: string): KeyFile | undefined {
    try{
      let walletItems = this.getWalletAddresses(path);
      for(let key in walletItems){
        if(key === address){
          let keyFile = KeyFile.fromJson(walletItems[key]);
          return keyFile;
        }
        else{
          let keyFile = KeyFile.fromJson(walletItems[key]);
          if(keyFile.baseAddress?.toString() === address){
            return keyFile;
          }
        }
      }
      return undefined;

    } catch(e: any){
      throw new Error(e);
    }
  }

  static getWalletAddresses(path: string): StorageWallet {
    try{
      return JSON.parse(this.getItem(path) || "{}") || {};
    } catch(e: any){
      throw new Error(e);
    }
  }

  static addWalletAddress(path: string, address: string, value: KeyFile){
    try{
      let walletItems = this.getWalletAddresses(path);
      walletItems[address] = value;

      this.setItem(path, JSON.stringify(walletItems));
    } catch(e: any){
      throw new Error(e);
    }
  }

  static removeItem(path: string) {
    if (typeof window === "undefined" || window === null) {
      const LocalStorage = require('node-localstorage').LocalStorage;
      const localStorage = new LocalStorage(this.nodeStorageLocation);    
      return localStorage.removeItem(path);
    }
    else{
      return localStorage.removeItem(path);
    }
  }

  static clear() {
    if (typeof window === "undefined" || window === null) {
      const LocalStorage = require('node-localstorage').LocalStorage;
      const localStorage = new LocalStorage(this.nodeStorageLocation);    
      return localStorage.clear();
    }
    else{
      return localStorage.clear();
    }
  }
}