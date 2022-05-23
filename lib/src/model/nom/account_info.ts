import {
  Token
} from "./token";

export class AccountInfo {
  address ? : string;
  blockCount ? : number;
  balanceInfoList ? : Array < BalanceInfoListItem >

    constructor(address ? : string, blockCount ? : number, balanceInfoList ? : Array < BalanceInfoListItem > ) {
      this.address = address;
      this.blockCount = blockCount;
      this.balanceInfoList = balanceInfoList;
    }

  static fromJson(json: {[key: string]: any} ): AccountInfo {
    return new AccountInfo(
      json['address'],
      json['accountHeight'],
      json['balanceInfoMap']
    );
  }
}

class BalanceInfoListItem {
  token ? : Token;
  balance ? : number;
  balanceWithDecimals ? : number;
  balanceFormatted ? : string;


}