/// <reference types="node" />
import { Address } from "../primitives/address";
import { Hash } from "../primitives/hash";
export declare class FusionEntryList {
    qsrAmount: number;
    count: number;
    list: Array<FusionEntry>;
    constructor(qsrAmount: number, count: number, list: Array<FusionEntry>);
    static fromJson(json: {
        [key: string]: any;
    }): FusionEntryList;
    toJson(): {
        [key: string]: any;
    };
}
export declare class FusionEntry {
    qsrAmount: number;
    beneficiary: Address;
    expirationHeight: number;
    id: Hash;
    isRevocable?: boolean;
    constructor(qsrAmount: number, beneficiary: Address, expirationHeight: number, id: Hash, isRevocable: boolean);
    static fromJson(json: {
        [key: string]: any;
    }): FusionEntry;
    toJson(): {
        [key: string]: any;
    };
}
export declare class PlasmaInfo {
    currentPlasma: number;
    maxPlasma: number;
    qsrAmount: number;
    constructor(currentPlasma: number, maxPlasma: number, qsrAmount: number);
    static fromJson(json: {
        [key: string]: any;
    }): PlasmaInfo;
    toJson(): {
        [key: string]: any;
    };
}
export declare class GetRequiredParam {
    address: Address;
    blockType: number;
    toAddress?: Address;
    data?: Buffer;
    constructor(address: Address, blockType: number, toAddress?: Address, data?: Buffer);
    static fromJson(json: {
        [key: string]: any;
    }): GetRequiredParam;
    toJson(): {
        [key: string]: any;
    };
    toString(): string;
}
export declare class GetRequiredResponse {
    availablePlasma: number;
    basePlasma: number;
    requiredDifficulty: number;
    constructor(availablePlasma: number, basePlasma: number, requiredDifficulty: number);
    static fromJson(json: {
        [key: string]: any;
    }): GetRequiredResponse;
}
