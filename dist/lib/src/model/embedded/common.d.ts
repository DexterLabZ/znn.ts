import { Address } from "../primitives/address";
import { Hash } from "./../primitives/hash";
import { BigNumber } from "ethers";
export declare class UncollectedReward {
    address: Address;
    znnAmount: BigNumber;
    qsrAmount: BigNumber;
    constructor(address: Address, znnAmount: BigNumber, qsrAmount: BigNumber);
    static fromJson(json: any): UncollectedReward;
    toJson(): {
        [key: string]: any;
    };
}
export declare class RewardHistoryEntry {
    epoch: number;
    znnAmount: BigNumber;
    qsrAmount: BigNumber;
    constructor(epoch: number, znnAmount: BigNumber, qsrAmount: BigNumber);
    static fromJson(json: {
        [key: string]: any;
    }): RewardHistoryEntry;
    toJson(): {
        [key: string]: any;
    };
}
export declare class RewardHistoryList {
    count: number;
    list: Array<RewardHistoryEntry>;
    constructor(count: number, list: Array<RewardHistoryEntry>);
    static fromJson(json: {
        [key: string]: any;
    }): RewardHistoryList;
    toJson(): {
        [key: string]: any;
    };
}
export declare class VoteBreakdown {
    id: Hash;
    yes: number;
    no: number;
    total: number;
    constructor(yes: number, no: number, total: number, id: Hash);
    static fromJson(json: Map<string, any>): VoteBreakdown;
}
