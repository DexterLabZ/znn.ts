import BigNumber from "bignumber.js";
import { Token } from "./token";
export declare class AccountInfo {
    address?: string;
    blockCount?: number;
    balanceInfoList?: Array<BalanceInfoListItem>;
    balanceInfoMap?: {
        [key: string]: BalanceInfoListItem;
    };
    constructor(address?: string, blockCount?: number, balanceInfoList?: Array<BalanceInfoListItem>, balanceInfoMap?: {
        [key: string]: BalanceInfoListItem;
    });
    static fromJson(json: {
        [key: string]: any;
    }): AccountInfo;
    toJson(): {
        [key: string]: any;
    };
}
declare class BalanceInfoListItem {
    token?: Token;
    balance?: BigNumber;
    balanceWithDecimals?: BigNumber;
    balanceFormatted?: string;
    constructor(token: Token, balance: BigNumber);
    static fromJson(json: {
        [key: string]: any;
    }): BalanceInfoListItem;
    toJson(): {
        [key: string]: any;
    };
}
export {};
