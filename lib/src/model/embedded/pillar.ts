import {AmountUtils} from "../../utils/amount";
import {Address} from "../primitives/address";
import BigNumber from "bignumber.js";

export class PillarInfo {
  static unknownType: number = 0;
  static legacyPillarType: number = 1;
  static regularPillarType: number = 1;

  name: string;
  rank: number;
  type: number;
  ownerAddress: Address;
  producerAddress: Address;
  withdrawAddress: Address;
  giveMomentumRewardPercentage: number;
  giveDelegateRewardPercentage: number;
  isRevocable: boolean;
  revokeCooldown: number;
  revokeTimestamp: number;
  currentStats: PillarEpochStats;
  weight: number | string | BigNumber;

  constructor(
    name: string,
    rank: number,
    type: number,
    ownerAddress: Address,
    producerAddress: Address,
    withdrawAddress: Address,
    giveMomentumRewardPercentage: number,
    giveDelegateRewardPercentage: number,
    isRevocable: boolean,
    revokeCooldown: number,
    revokeTimestamp: number,
    currentStats: PillarEpochStats,
    weight: number | string | BigNumber
  ) {
    this.name = name;
    this.rank = rank;
    this.type = type;
    this.ownerAddress = ownerAddress;
    this.producerAddress = producerAddress;
    this.withdrawAddress = withdrawAddress;
    this.giveMomentumRewardPercentage = giveMomentumRewardPercentage;
    this.giveDelegateRewardPercentage = giveDelegateRewardPercentage;
    this.isRevocable = isRevocable;
    this.revokeCooldown = revokeCooldown;
    this.revokeTimestamp = revokeTimestamp;
    this.currentStats = currentStats;
    this.weight = weight;
  }

  static fromJson(json: {[key: string]: any}): PillarInfo {
    return new PillarInfo(
      json.name,
      json.rank,
      json.type ?? PillarInfo.unknownType,
      Address.parse(json.ownerAddress),
      Address.parse(json.producerAddress),
      Address.parse(json.withdrawAddress),
      json.giveMomentumRewardPercentage,
      json.giveDelegateRewardPercentage,
      json.isRevocable,
      json.revokeCooldown,
      json.revokeTimestamp,
      PillarEpochStats.fromJson(json.currentStats),
      json.weight
    );
  }

  toJson(): {[key: string]: any} {
    return {
      name: this.name,
      rank: this.rank,
      type: this.type,
      ownerAddress: this.ownerAddress.toString(),
      producerAddress: this.producerAddress.toString(),
      withdrawAddress: this.withdrawAddress.toString(),
      giveMomentumRewardPercentage: this.giveMomentumRewardPercentage,
      giveDelegateRewardPercentage: this.giveDelegateRewardPercentage,
      isRevocable: this.isRevocable,
      revokeCooldown: this.revokeCooldown,
      revokeTimestamp: this.revokeTimestamp,
      currentStats: this.currentStats.toJson(),
      weight: this.weight.toString(),
    };
  }
}

export class PillarInfoList {
  count: number;
  list: Array<PillarInfo>;

  constructor(count: number, list: Array<PillarInfo>) {
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): PillarInfoList {
    return new PillarInfoList(json.count, json.list.map(PillarInfo.fromJson));
  }

  toJson(): {[key: string]: any} {
    return {
      count: this.count,
      list: this.list.map((pillarInfo) => pillarInfo.toJson()),
    };
  }
}
export class PillarEpochStats {
  producedMomentums: number;
  expectedMomentums: number;

  constructor(producedMomentums: number, expectedMomentums: number) {
    this.producedMomentums = producedMomentums;
    this.expectedMomentums = expectedMomentums;
  }

  static fromJson(json: {[key: string]: any}): PillarEpochStats {
    return new PillarEpochStats(json.producedMomentums, json.expectedMomentums);
  }

  toJson(): {[key: string]: any} {
    return {
      producedMomentums: this.producedMomentums,
      expectedMomentums: this.expectedMomentums,
    };
  }
}

export class PillarEpochHistory {
  name: string;
  epoch: number;
  giveBlockRewardPercentage: number;
  giveDelegateRewardPercentage: number;
  producedBlockNum: number;
  expectedBlockNum: number;
  weight: number | string | BigNumber;

  constructor(
    name: string,
    epoch: number,
    giveBlockRewardPercentage: number,
    giveDelegateRewardPercentage: number,
    producedBlockNum: number,
    expectedBlockNum: number,
    weight: number | string | BigNumber
  ) {
    this.name = name;
    this.epoch = epoch;
    this.giveBlockRewardPercentage = giveBlockRewardPercentage;
    this.giveDelegateRewardPercentage = giveDelegateRewardPercentage;
    this.producedBlockNum = producedBlockNum;
    this.expectedBlockNum = expectedBlockNum;
    this.weight = weight;
  }

  static fromJson(json: {[key: string]: any}): PillarEpochHistory {
    return new PillarEpochHistory(
      json.name,
      json.epoch,
      json.giveBlockRewardPercentage,
      json.giveDelegateRewardPercentage,
      json.producedBlockNum,
      json.expectedBlockNum,
      json.weight
    );
  }

  toJson(): {[key: string]: any} {
    return {
      name: this.name,
      epoch: this.epoch,
      giveBlockRewardPercentage: this.giveBlockRewardPercentage,
      giveDelegateRewardPercentage: this.giveDelegateRewardPercentage,
      producedBlockNum: this.producedBlockNum,
      expectedBlockNum: this.expectedBlockNum,
      weight: this.weight.toString(),
    };
  }
}

export class PillarEpochHistoryList {
  count: number;
  list: Array<PillarEpochHistory>;

  constructor(count: number, list: Array<PillarEpochHistory>) {
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): PillarEpochHistoryList {
    return new PillarEpochHistoryList(json.count, json.list.map(PillarEpochHistory.fromJson));
  }

  toJson(): {[key: string]: any} {
    return {
      count: this.count,
      list: this.list.map((pillarEpochHistory) => pillarEpochHistory.toJson()),
    };
  }
}

export class DelegationInfo {
  name: string;
  status: number;
  weight: number | string | BigNumber;
  weightWithDecimals?: number;

  constructor(name: string, status: number, weight: number) {
    this.name = name;
    this.status = status;
    this.weight = weight;
    this.weightWithDecimals = AmountUtils.addNumberDecimals(weight, 8);
  }

  static fromJson(json: {[key: string]: any}): DelegationInfo {
    return new DelegationInfo(json.name, json.status, json.weight);
  }

  toJson(): {[key: string]: any} {
    return {
      name: this.name,
      status: this.status,
      weight: this.weight.toString(),
    };
  }

  isPillarActive(): boolean {
    return this.status == 1;
  }
}
