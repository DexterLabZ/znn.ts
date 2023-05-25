/// <reference types="node" />
declare class KeyData {
    key?: Buffer;
    chainCode?: Buffer;
    constructor(key?: Buffer, chainCode?: Buffer);
}
declare class Ed25519 {
    constructor();
    static getPublicKey(privateKey: Buffer, withZeroByte?: boolean): Buffer;
    static isValidPath(path: any): boolean;
    static _getKeys(data: Buffer, keyParameter: Buffer): KeyData;
    static getMasterKeyFromSeed(seed: string): KeyData;
    static derivePath(path: string, seed: string, offset?: number): any;
    static CKDPriv_old({ key, chainCode }: KeyData, index: number): KeyData;
    static CKDPriv({ key, chainCode }: KeyData, index: number): KeyData;
}
export { Ed25519 };
