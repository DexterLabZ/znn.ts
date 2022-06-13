"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountInfo = void 0;
class AccountInfo {
    constructor(address, blockCount, balanceInfoList) {
        this.address = address;
        this.blockCount = blockCount;
        this.balanceInfoList = balanceInfoList;
    }
    static fromJson(json) {
        return new AccountInfo(json['address'], json['accountHeight'], json['balanceInfoMap']);
    }
}
exports.AccountInfo = AccountInfo;
class BalanceInfoListItem {
}
