import { Hash } from "../primitives/hash";
import { Address } from "../primitives/address";
import BigNumber from "bignumber.js";
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
    amount: number | string | BigNumber;
    weightedAmount: number | string | BigNumber;
    startTimestamp: number;
    expirationTimestamp: number;
    address: Address;
    id: Hash;
    constructor(amount: number | string | BigNumber, weightedAmount: number | string | BigNumber, startTimestamp: number, expirationTimestamp: number, address: Address, id: Hash);
    static fromJson(json: {
        [key: string]: any;
    }): StakeEntry;
    toJson(): {
        [key: string]: any;
    };
}
