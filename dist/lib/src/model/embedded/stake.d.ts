import { Hash } from "../primitives/hash";
import { Address } from "../primitives/address";
export declare class StakeList {
    totalAmount: number;
    totalWeightedAmount: number;
    count: number;
    list: Array<StakeEntry>;
    constructor(totalAmount: number, totalWeightedAmount: number, count: number, list: Array<StakeEntry>);
    static fromJson(json: {
        [key: string]: any;
    }): StakeList;
    toJson(): {
        [key: string]: any;
    };
}
export declare class StakeEntry {
    amount: number;
    weightedAmount: number;
    startTimestamp: number;
    expirationTimestamp: number;
    address: Address;
    id: Hash;
    constructor(amount: number, weightedAmount: number, startTimestamp: number, expirationTimestamp: number, address: Address, id: Hash);
    static fromJson(json: {
        [key: string]: any;
    }): StakeEntry;
    toJson(): {
        [key: string]: any;
    };
}
