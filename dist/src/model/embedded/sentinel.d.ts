import { Address } from "../primitives/address";
export declare class SentinelInfo {
    owner: Address;
    registrationTimestamp: number;
    isRevocable: boolean;
    revokeCooldown: number;
    active: boolean;
    constructor(owner: Address, registrationTimestamp: number, isRevocable: boolean, revokeCooldown: number, active: boolean);
    static fromJson(json: {
        [key: string]: any;
    }): SentinelInfo;
    toJson(): {
        [key: string]: any;
    };
}
export declare class SentinelInfoList {
    count: number;
    list: Array<SentinelInfo>;
    constructor(count: number, list: Array<SentinelInfo>);
    static fromJson(json: {
        [key: string]: any;
    }): SentinelInfoList;
    toJson(): {
        [key: string]: any;
    };
}
