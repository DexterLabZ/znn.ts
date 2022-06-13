import { KeyFile } from "../wallet/keyfile";
declare type StorageWallet = {
    [key: string]: KeyFile;
};
export declare class StorageController {
    constructor();
    static getItem(path: string): string | null | undefined;
    static setItem(path: string, value: string): void;
    static findWalletItem(path: string, address: string): KeyFile | undefined;
    static getWalletAddresses(path: string): StorageWallet;
    static addWalletAddress(path: string, address: string, value: KeyFile): void;
    static removeItem(path: string): void;
    static clear(): void;
}
export {};
