/// <reference types="node" />
import { Address } from "../primitives/address";
import { Hash } from "./../primitives/hash";
import { AccountHeader } from "./account_header";
export declare class Momentum {
    version: number;
    chainIdentifier: number;
    hash: Hash;
    previousHash: Hash;
    height: number;
    timestamp: number;
    data: Buffer;
    content: Array<AccountHeader>;
    changesHash?: Hash;
    publicKey: string;
    signature: string;
    producer: Address;
    constructor(version: number, chainIdentifier: number, hash: Hash, previousHash: Hash, height: number, timestamp: number, data: Buffer, content: Array<AccountHeader>, changesHash: Hash, publicKey: string, signature: string, producer: Address);
    static fromJson(json: {
        [key: string]: any;
    }): Momentum;
    toJson(): {
        [key: string]: any;
    };
}
export declare class MomentumList {
    count: number;
    list: Array<Momentum>;
    constructor(count: number, list: Array<Momentum>);
    static fromJson(json: {
        [key: string]: any;
    }): MomentumList;
    toJson(): {
        [key: string]: any;
    };
}
