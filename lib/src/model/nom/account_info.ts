import { BigNumber } from "ethers";
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
    // console.log("AccountInfo.fromJson(", json);
    // console.log("new AccountInfo()", new AccountInfo(
    //   json['address'],
    //   json['accountHeight'],
    //   json['balanceInfoMap']
    // ));
    return new AccountInfo(
      json['address'],
      json['accountHeight'],
      json['balanceInfoMap']
    );
  }
}

class BalanceInfoListItem {
  token ? : Token;
  balance ? : BigNumber;
  balanceWithDecimals ? : number;
  balanceFormatted ? : string;


}