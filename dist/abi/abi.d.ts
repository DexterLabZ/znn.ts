/// <reference types="node" />
import { AbiType } from "./abi_types";
export declare class Abi {
    entries: Array<Entry>;
    constructor(entries: Array<Entry>);
    static fromJson(j: any): Abi;
    static _parseEntries(j: any): Array<Entry>;
    encodeFunction(name: string, args: any): Buffer;
}
declare enum TypeEnum {
    function = 0
}
export declare class Entry {
    name?: string;
    inputs?: Array<Param>;
    type?: TypeEnum;
    constructor(name?: string, inputs?: Array<Param>, type?: TypeEnum);
    formatSignature(): string;
    encodeSignature(): Buffer;
    fingerprintSignature(): Buffer;
    encodeArguments(args: any): Buffer;
}
export declare class Param {
    indexed: boolean;
    name?: string;
    type: AbiType;
    constructor(name: string, type: AbiType);
}
export declare class AbiFunction extends Entry {
    static encodedSignLength: number;
    constructor(name: string, inputs: Array<Param>);
    encode(args: any): Buffer;
    extractSignature(data: Buffer): Buffer;
    encodeSignature(): Buffer;
}
export {};
