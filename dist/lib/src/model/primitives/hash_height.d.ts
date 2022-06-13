/// <reference types="node" />
import { Hash } from "./hash";
export declare class HashHeight {
    hash?: Hash;
    height?: number;
    constructor(hash: Hash, height: number);
    static fromJson(json: {
        [key: string]: any;
    }): HashHeight;
    toJson(): {
        [key: string]: any;
    };
    toString(): string;
    getBytes(): Buffer;
}
export declare const emptyHashHeight: HashHeight;
