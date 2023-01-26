import { KeyFile } from "../wallet/keyfile";
type StorageWallet = {
    [key: string]: KeyFile;
};
export declare class StorageController {
    static nodeStorageLocation: string;
    constructor();
    static getItem(path: string): string | null | undefined;
    static setItem(path: string, value: string): any;
    static findWalletItem(path: string, address: string): KeyFile | undefined;
    static getWalletAddresses(path: string): StorageWallet;
    static addWalletAddress(path: string, address: string, value: KeyFile): void;
    static removeItem(path: string): any;
    static clear(): any;
}
export {};
