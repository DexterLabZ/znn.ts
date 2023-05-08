import { Address } from "../primitives/address";
import BigNumber from "bignumber.js";
export declare class PillarInfo {
    static unknownType: number;
    static legacyPillarType: number;
    static regularPillarType: number;
    name: string;
    rank: number;
    type: number;
    ownerAddress: Address;
    producerAddress: Address;
    withdrawAddress: Address;
    giveMomentumRewardPercentage: number;
    giveDelegateRewardPercentage: number;
    isRevocable: boolean;
    revokeCooldown: number;
    revokeTimestamp: number;
    currentStats: PillarEpochStats;
    weight: number | string | BigNumber;
    constructor(name: string, rank: number, type: number, ownerAddress: Address, producerAddress: Address, withdrawAddress: Address, giveMomentumRewardPercentage: number, giveDelegateRewardPercentage: number, isRevocable: boolean, revokeCooldown: number, revokeTimestamp: number, currentStats: PillarEpochStats, weight: number | string | BigNumber);
    static fromJson(json: {
        [key: string]: any;
    }): PillarInfo;
    toJson(): {
        [key: string]: any;
    };
}
export declare class PillarInfoList {
    count: number;
    list: Array<PillarInfo>;
    constructor(count: number, list: Array<PillarInfo>);
    static fromJson(json: {
        [key: string]: any;
    }): PillarInfoList;
    toJson(): {
        [key: string]: any;
    };
}
export declare class PillarEpochStats {
    producedMomentums: number;
    expectedMomentums: number;
    constructor(producedMomentums: number, expectedMomentums: number);
    static fromJson(json: {
        [key: string]: any;
    }): PillarEpochStats;
    toJson(): {
        [key: string]: any;
    };
}
export declare class PillarEpochHistory {
    name: string;
    epoch: number;
    giveBlockRewardPercentage: number;
    giveDelegateRewardPercentage: number;
    producedBlockNum: number;
    expectedBlockNum: number;
    weight: number | string | BigNumber;
    constructor(name: string, epoch: number, giveBlockRewardPercentage: number, giveDelegateRewardPercentage: number, producedBlockNum: number, expectedBlockNum: number, weight: number | string | BigNumber);
    static fromJson(json: {
        [key: string]: any;
    }): PillarEpochHistory;
    toJson(): {
        [key: string]: any;
    };
}
export declare class PillarEpochHistoryList {
    count: number;
    list: Array<PillarEpochHistory>;
    constructor(count: number, list: Array<PillarEpochHistory>);
    static fromJson(json: {
        [key: string]: any;
    }): PillarEpochHistoryList;
    toJson(): {
        [key: string]: any;
    };
}
export declare class DelegationInfo {
    name: string;
    status: number;
    weight: number | string | BigNumber;
    weightWithDecimals?: number;
    constructor(name: string, status: number, weight: number);
    static fromJson(json: {
        [key: string]: any;
    }): DelegationInfo;
    toJson(): {
        [key: string]: any;
    };
    isPillarActive(): boolean;
}
