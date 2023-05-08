import { Hash } from "../primitives/hash";
import { Address } from "../primitives/address";
import { TokenStandard } from "../primitives/token_standard";
import BigNumber from "bignumber.js";

export class TokenTuple{
  tokenStandard: string;
  znnPercentage: number;
  qsrPercentage: number;
  minAmount: BigNumber;

  constructor(tokenStandard: string, 
      znnPercentage: number, 
      qsrPercentage: number, 
      minAmount: BigNumber){
    this.tokenStandard = tokenStandard;
    this.znnPercentage = znnPercentage;
    this.qsrPercentage = qsrPercentage;
    this.minAmount = minAmount;
  }

  static fromJson(json: {[key: string]: any}): TokenTuple{
    return new TokenTuple(
      json.tokenStandard,
      json.znnPercentage,
      json.qsrPercentage,
      new BigNumber(json.minAmount),
    );
  }

  toJson(): {[key: string]: any}{
    return {
      tokenStandard: this.tokenStandard,
      znnPercentage: this.znnPercentage,
      qsrPercentage: this.qsrPercentage,
      minAmount: this.minAmount?.toString(),
    };
  }
}

export class LiquidityInfo {
  administratorPubKey: string;
  isHalted: boolean;
  tokenTuples: Array<TokenTuple>;

  constructor(administratorPubKey: string, 
      isHalted: boolean, 
      tokenTuples: Array<TokenTuple>){
    this.administratorPubKey = administratorPubKey;
    this.isHalted = isHalted;
    this.tokenTuples = tokenTuples;
  }

  static fromJson(json: {[key: string]: any}): LiquidityInfo{
    return new LiquidityInfo(
      json.administratorPubKey,
      json.isHalted,
      json.tokenTuples?.map((entry: {[key: string]: any}) => TokenTuple.fromJson(entry))
    );
  }

  toJson(): {[key: string]: any}{
    return {
      administratorPubKey: this.administratorPubKey,
      isHalted: this.isHalted,
      tokenTuples: this.tokenTuples?.map((entry: {[key: string]: any}) => entry.toJson())
    };
  }
}

export class LiquidityStakeList{
  totalAmount: BigNumber;
  totalWeightedAmount: BigNumber;
  count: number;
  list: Array<LiquidityStakeEntry>;

  constructor(totalAmount: BigNumber, totalWeightedAmount: BigNumber, count: number, list: Array<LiquidityStakeEntry>){
    this.totalAmount = totalAmount;
    this.totalWeightedAmount = totalWeightedAmount;
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): LiquidityStakeList{
    return new LiquidityStakeList(
      new BigNumber(json.totalAmount),
      new BigNumber(json.totalWeightedAmount),  
      json.count,
      json.list?.map((entry: {[key: string]: any}) => LiquidityStakeEntry.fromJson(entry))
    );
  }

  toJson(): {[key: string]: any}{
    return {
      totalAmount: this.totalAmount?.toString(),
      totalWeightedAmount: this.totalWeightedAmount?.toString(),
      count: this.count,
      list: this.list?.map((entry: {[key: string]: any}) => entry.toJson())
    };
  }
}

export class LiquidityStakeEntry{
  amount: BigNumber;
  tokenStandard: TokenStandard;
  weightedAmount: BigNumber;
  startTime: number;
  revokeTime: number;
  expirationTime: number;
  stakeAddress: Address;
  id: Hash;

  constructor(amount: BigNumber, 
      tokenStandard: TokenStandard,
      weightedAmount: BigNumber, 
      startTime: number,
      revokeTime: number,
      expirationTime: number, 
      stakeAddress: Address, 
      id: Hash){
    this.amount = amount;
    this.tokenStandard = tokenStandard;
    this.weightedAmount = weightedAmount;
    this.startTime = startTime;
    this.revokeTime = revokeTime;
    this.expirationTime = expirationTime;
    this.stakeAddress = stakeAddress;
    this.id = id;
  }

  static fromJson(json: {[key: string]: any}): LiquidityStakeEntry{
    return new LiquidityStakeEntry(
      new BigNumber(json.amount),
      json.tokenStandard,
      json.weightedAmount,
      json.startTime,
      json.revokeTime,
      json.expirationTime,
      Address.parse(json.stakeAddress),
      Hash.parse(json.id)
    );
  }

  toJson(): {[key: string]: any}{
    return {
      amount: this.amount?.toString(),
      tokenStandard: this.tokenStandard,
      weightedAmount: this.weightedAmount,
      startTime: this.startTime,
      revokeTime: this.revokeTime,
      expirationTime: this.expirationTime,
      stakeAddress: this.stakeAddress.toString(),
      id: this.id.toString()
    };
  }
}