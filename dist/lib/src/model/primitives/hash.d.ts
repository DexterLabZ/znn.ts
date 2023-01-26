/// <reference types="node" />
export declare class Hash {
    hash: Buffer;
    static _length: number;
    constructor(hash: Buffer);
    static parse(hash: string): Hash;
    static digest(data: Buffer): Promise<Hash>;
    getBytes(): Buffer;
    toString(): string;
}
export declare const emptyHash: Hash;
