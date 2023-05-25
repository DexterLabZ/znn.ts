/// <reference types="node" />
import { Address } from "../model/primitives/address";
import { KeyStore } from "./keystore";
declare class KeyFile {
    baseAddress?: Address;
    crypto?: _Crypto;
    timestamp?: number;
    version?: number;
    constructor(baseAddress?: Address, crypto?: _Crypto, timestamp?: number, version?: number);
    static encrypt(store: KeyStore, password: string): Promise<KeyFile>;
    decrypt(password: string): Promise<Buffer>;
    _encryptEntropy(store: KeyStore, password: string): Promise<KeyFile>;
    static fromJson(json: any): KeyFile;
    toJson(): any;
}
declare class _Crypto {
    argon2Params?: _Argon2Params;
    cipherData?: Buffer;
    cipherName?: string;
    kdf?: string;
    nonce?: Buffer;
    constructor(argon2Params?: _Argon2Params, cipherData?: Buffer, cipherName?: string, kdf?: string, nonce?: Buffer);
    static fromJson(json: any): _Crypto;
    toJson(): {
        [key: string]: any;
    };
}
declare class _Argon2Params {
    salt?: Buffer;
    constructor(salt?: Buffer);
    static fromJson(json: any): _Argon2Params;
    toJson(): {
        [key: string]: any;
    };
}
export { KeyFile };
