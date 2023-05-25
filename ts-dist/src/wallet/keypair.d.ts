/// <reference types="node" />
import { Address } from "../model/primitives/address";
declare class KeyPair {
    privateKey: Buffer;
    publicKey?: Buffer;
    _address?: Address;
    constructor(privateKey: Buffer, publicKey?: Buffer, address?: Address);
    generateKeyPair(privateKey?: Buffer): Promise<KeyPair>;
    getPrivateKey(): Buffer;
    getPublicKey(): Promise<Buffer>;
    getAddress(): Promise<Address>;
    sign(message: Buffer): Promise<Buffer>;
}
export { KeyPair };
