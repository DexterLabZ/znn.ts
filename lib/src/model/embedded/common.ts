import {Address} from "../primitives/address";
import {Hash} from "./../primitives/hash";
import BigNumber from "bignumber.js";

export class UncollectedReward {
  address: Address;
  znnAmount: number | string | BigNumber;
  qsrAmount: number | string | BigNumber;

  constructor(address: Address, znnAmount: number | string | BigNumber, qsrAmount: number | string | BigNumber) {
    this.address = address;
    this.znnAmount = znnAmount;
    this.qsrAmount = qsrAmount;
  }

  static fromJson(json: any): UncollectedReward {
    let address = Address.parse(json.address);
    let znnAmount = json.znnAmount;
    let qsrAmount = json.qsrAmount;
    return new UncollectedReward(address, znnAmount, qsrAmount);
  }

  toJson(): {[key: string]: any} {
    return {
      address: this.address.toString(),
      znnAmount: this.znnAmount.toString(),
      qsrAmount: this.qsrAmount.toString(),
    };
  }
}

export class RewardHistoryEntry {
  epoch: number;
  znnAmount: number | string | BigNumber;
  qsrAmount: number | string | BigNumber;

  constructor(epoch: number, znnAmount: number | string | BigNumber, qsrAmount: number | string | BigNumber) {
    this.epoch = epoch;
    this.znnAmount = znnAmount;
    this.qsrAmount = qsrAmount;
  }

  static fromJson(json: {[key: string]: any}): RewardHistoryEntry {
    return new RewardHistoryEntry(json.epoch, json.znnAmount, json.qsrAmount);
  }

  toJson(): {
    [key: string]: any;
  } {
    return {
      epoch: this.epoch,
      znnAmount: this.znnAmount.toString(),
      qsrAmount: this.qsrAmount.toString(),
    };
  }
}

export class RewardHistoryList {
  count: number;
  list: Array<RewardHistoryEntry>;

  constructor(count: number, list: Array<RewardHistoryEntry>) {
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): RewardHistoryList {
    return new RewardHistoryList(json.count, json.list.map(RewardHistoryEntry.fromJson));
  }

  toJson(): {[key: string]: any} {
    return {
      count: this.count,
      list: this.list.map((entry: {[key: string]: any}) => entry.toJson()),
    };
  }
}
export class VoteBreakdown {
  public id: Hash;
  public yes: number;
  public no: number;
  public total: number;

  constructor(yes: number, no: number, total: number, id: Hash) {
    this.yes = yes;
    this.no = no;
    this.total = total;
    this.id = id;
  }

  static fromJson(json: Map<string, any>): VoteBreakdown {
    let id = Hash.parse(json.get("id"));
    let yes = json.get("yes");
    let no = json.get("no");
    let total = json.get("total");
    return new VoteBreakdown(yes, no, total, id);
  }
}
