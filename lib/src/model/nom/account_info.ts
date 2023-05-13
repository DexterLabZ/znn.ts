import {BigNumber, ethers} from "ethers";
import {AmountUtils} from "../../utils/amount";
import {Token} from "./token";

export class AccountInfo {
  address?: string;
  blockCount?: number;
  balanceInfoList?: Array<BalanceInfoListItem>;
  balanceInfoMap?: {[key: string]: BalanceInfoListItem};

  constructor(
    address?: string,
    blockCount?: number,
    balanceInfoList?: Array<BalanceInfoListItem>,
    balanceInfoMap?: {[key: string]: BalanceInfoListItem}
  ) {
    this.address = address;
    this.blockCount = blockCount;
    this.balanceInfoList = balanceInfoList;
    this.balanceInfoMap = balanceInfoMap;
  }

  static fromJson(json: {[key: string]: any}): AccountInfo {
    const mapObject = (obj: any, func: any) => {
      return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
    };

    return new AccountInfo(
      json["address"],
      json["accountHeight"],
      json["accountHeight"]! > 0
        ? Object.keys(json["balanceInfoMap"])?.map((entry: string) =>
            BalanceInfoListItem.fromJson(json["balanceInfoMap"][entry])
          )
        : [],
      json["accountHeight"]! > 0 ? mapObject(json["balanceInfoMap"], BalanceInfoListItem.fromJson) : []
    );
  }

  toJson(): {[key: string]: any} {
    return {
      address: this.address,
      blockCount: this.blockCount,
      balanceInfoList: this.balanceInfoList?.map((entry: {[key: string]: any}) => entry.toJson()),
    };
  }
}

export class BalanceInfoListItem {
  token?: Token;
  balance?: BigNumber;
  balanceWithDecimals?: string;
  balanceFormatted?: string;

  constructor(token: Token, balance: BigNumber) {
    this.token = token;
    this.balance = balance;
    this.balanceWithDecimals = AmountUtils.addDecimals(balance, token.decimals);
    this.balanceFormatted = `${this.balanceWithDecimals} ${token.symbol}`;
  }

  static fromJson(json: {[key: string]: any}): BalanceInfoListItem {
    return new BalanceInfoListItem(json.token, ethers.BigNumber.from(json.balance));
  }

  toJson(): {[key: string]: any} {
    return {
      token: this.token,
      balance: this.balance?.toString(),
      balanceWithDecimals: this.balanceWithDecimals?.toString(),
      balanceFormatted: this.balanceFormatted,
    };
  }
}
