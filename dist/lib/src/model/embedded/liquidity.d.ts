import { Hash } from "../primitives/hash";
import { Address } from "../primitives/address";
import { TokenStandard } from "../primitives/token_standard";
import BigNumber from "bignumber.js";
export declare class TokenTuple {
    tokenStandard: string;
    znnPercentage: number;
    qsrPercentage: number;
    minAmount: BigNumber;
    constructor(tokenStandard: string, znnPercentage: number, qsrPercentage: number, minAmount: BigNumber);
    static fromJson(json: {
        [key: string]: any;
    }): TokenTuple;
    toJson(): {
        [key: string]: any;
    };
}
export declare class LiquidityInfo {
    administratorPubKey: string;
    isHalted: boolean;
    tokenTuples: Array<TokenTuple>;
    constructor(administratorPubKey: string, isHalted: boolean, tokenTuples: Array<TokenTuple>);
    static fromJson(json: {
        [key: string]: any;
    }): LiquidityInfo;
    toJson(): {
        [key: string]: any;
    };
}
export declare class LiquidityStakeList {
    totalAmount: BigNumber;
    totalWeightedAmount: BigNumber;
    count: number;
    list: Array<LiquidityStakeEntry>;
    constructor(totalAmount: BigNumber, totalWeightedAmount: BigNumber, count: number, list: Array<LiquidityStakeEntry>);
    static fromJson(json: {
        [key: string]: any;
    }): LiquidityStakeList;
    toJson(): {
        [key: string]: any;
    };
}
export declare class LiquidityStakeEntry {
    amount: BigNumber;
    tokenStandard: TokenStandard;
    weightedAmount: BigNumber;
    startTime: number;
    revokeTime: number;
    expirationTime: number;
    stakeAddress: Address;
    id: Hash;
    constructor(amount: BigNumber, tokenStandard: TokenStandard, weightedAmount: BigNumber, startTime: number, revokeTime: number, expirationTime: number, stakeAddress: Address, id: Hash);
    static fromJson(json: {
        [key: string]: any;
    }): LiquidityStakeEntry;
    toJson(): {
        [key: string]: any;
    };
}
