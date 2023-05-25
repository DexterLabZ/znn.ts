import { Address } from "../primitives/address";

export class SentinelInfo{
  owner: Address;
  registrationTimestamp: number;
  isRevocable: boolean;
  revokeCooldown: number;
  active: boolean;

  constructor(owner: Address, registrationTimestamp: number, isRevocable: boolean, revokeCooldown: number, active: boolean){
    this.owner = owner;
    this.registrationTimestamp = registrationTimestamp;
    this.isRevocable = isRevocable;
    this.revokeCooldown = revokeCooldown;
    this.active = active;
  }

  static fromJson(json: {[key: string]: any}): SentinelInfo{
    return new SentinelInfo(
      Address.parse(json.owner),
      json.registrationTimestamp,
      json.isRevocable,
      json.revokeCooldown,
      json.active
    );
  }

  toJson(): {[key: string]: any}{
    return {
      owner: this.owner.toString(),
      registrationTimestamp: this.registrationTimestamp,
      isRevocable: this.isRevocable,
      revokeCooldown: this.revokeCooldown,
      active: this.active
    };
  }
}

export class SentinelInfoList{
  count: number;
  list: Array<SentinelInfo>;

  constructor(count: number, list: Array<SentinelInfo>){
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): SentinelInfoList{
    return new SentinelInfoList(
      json.count,
      json.list.map((entry: {[key: string]: any}) => SentinelInfo.fromJson(entry))
    );
  }

  toJson(): {[key: string]: any}{
    return {
      count: this.count,
      list: this.list.map((entry: {[key: string]: any}) => entry.toJson())
    };
  }
}