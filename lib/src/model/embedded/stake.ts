import {Hash} from "../primitives/hash";
import {Address} from "../primitives/address";
import BigNumber from "bignumber.js";

export class StakeList {
  totalAmount: number;
  totalWeightedAmount: number;
  count: number;
  list: Array<StakeEntry>;

  constructor(totalAmount: number, totalWeightedAmount: number, count: number, list: Array<StakeEntry>) {
    this.totalAmount = totalAmount;
    this.totalWeightedAmount = totalWeightedAmount;
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): StakeList {
    return new StakeList(
      json.totalAmount,
      json.totalWeightedAmount,
      json.count,
      json.list.map((entry: {[key: string]: any}) => StakeEntry.fromJson(entry))
    );
  }

  toJson(): {[key: string]: any} {
    return {
      totalAmount: this.totalAmount.toString(),
      totalWeightedAmount: this.totalWeightedAmount.toString(),
      count: this.count,
      list: this.list.map((entry: {[key: string]: any}) => entry.toJson()),
    };
  }
}

export class StakeEntry {
  amount: BigNumber;
  weightedAmount: BigNumber;
  startTimestamp: number;
  expirationTimestamp: number;
  address: Address;
  id: Hash;

  constructor(
    amount: BigNumber,
    weightedAmount: BigNumber,
    startTimestamp: number,
    expirationTimestamp: number,
    address: Address,
    id: Hash
  ) {
    this.amount = amount;
    this.weightedAmount = weightedAmount;
    this.startTimestamp = startTimestamp;
    this.expirationTimestamp = expirationTimestamp;
    this.address = address;
    this.id = id;
  }

  static fromJson(json: {[key: string]: any}): StakeEntry {
    return new StakeEntry(
      new BigNumber(json.amount.toString()),
      new BigNumber(json.weightedAmount.toString()),
      json.startTimestamp,
      json.expirationTimestamp,
      Address.parse(json.address),
      Hash.parse(json.id)
    );
  }

  toJson(): {[key: string]: any} {
    return {
      amount: this.amount.toString(),
      weightedAmount: this.weightedAmount.toString(),
      startTimestamp: this.startTimestamp,
      expirationTimestamp: this.expirationTimestamp,
      address: this.address.toString(),
      id: this.id.toString(),
    };
  }
}
