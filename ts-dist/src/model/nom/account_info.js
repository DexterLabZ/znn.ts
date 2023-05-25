"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceInfoListItem = exports.AccountInfo = void 0;
const ethers_1 = require("ethers");
const amount_1 = require("../../utils/amount");
class AccountInfo {
    constructor(address, blockCount, balanceInfoList, balanceInfoMap) {
        this.address = address;
        this.blockCount = blockCount;
        this.balanceInfoList = balanceInfoList;
        this.balanceInfoMap = balanceInfoMap;
    }
    static fromJson(json) {
        const mapObject = (obj, func) => {
            return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
        };
        return new AccountInfo(json["address"], json["accountHeight"], json["accountHeight"] > 0
            ? Object.keys(json["balanceInfoMap"])?.map((entry) => BalanceInfoListItem.fromJson(json["balanceInfoMap"][entry]))
            : [], json["accountHeight"] > 0 ? mapObject(json["balanceInfoMap"], BalanceInfoListItem.fromJson) : []);
    }
    toJson() {
        return {
            address: this.address,
            blockCount: this.blockCount,
            balanceInfoList: this.balanceInfoList?.map((entry) => entry.toJson()),
        };
    }
}
exports.AccountInfo = AccountInfo;
class BalanceInfoListItem {
    constructor(token, balance) {
        this.token = token;
        this.balance = balance;
        this.balanceWithDecimals = amount_1.AmountUtils.addDecimals(balance, token.decimals);
        this.balanceFormatted = `${this.balanceWithDecimals} ${token.symbol}`;
    }
    static fromJson(json) {
        return new BalanceInfoListItem(json.token, ethers_1.ethers.BigNumber.from(json.balance));
    }
    toJson() {
        return {
            token: this.token,
            balance: this.balance?.toString(),
            balanceWithDecimals: this.balanceWithDecimals?.toString(),
            balanceFormatted: this.balanceFormatted,
        };
    }
}
exports.BalanceInfoListItem = BalanceInfoListItem;
