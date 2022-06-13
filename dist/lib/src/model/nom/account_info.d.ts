import { Token } from "./token";
export declare class AccountInfo {
    address?: string;
    blockCount?: number;
    balanceInfoList?: Array<BalanceInfoListItem>;
    constructor(address?: string, blockCount?: number, balanceInfoList?: Array<BalanceInfoListItem>);
    static fromJson(json: {
        [key: string]: any;
    }): AccountInfo;
}
declare class BalanceInfoListItem {
    token?: Token;
    balance?: number;
    balanceWithDecimals?: number;
    balanceFormatted?: string;
}
export {};
