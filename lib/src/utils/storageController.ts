import { KeyFile } from "../wallet/keyfile";

type StorageWallet = {
  [key: string]: KeyFile,
};
export class StorageController {
  constructor(){}
  
  
  static getItem(path: string): string | null | undefined {
    if(localStorage){
      return localStorage.getItem(path);
    }
    else{
      throw new Error("LocalStorage is not available");
    }
  }

  static setItem(path: string, value: string) {
    try {
      localStorage.setItem(path, value);
    } catch (e: any) {
      throw new Error(e);
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
    localStorage.removeItem(path);
  }

  static clear() {
    localStorage.clear();
  }
}