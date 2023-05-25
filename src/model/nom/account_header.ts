import { Address } from "../primitives/address";
import { Hash } from "../primitives/hash";

export class AccountHeader{
  address?: Address;
  hash?: Hash;
  height?: number;

  constructor(address?: Address, hash?: Hash, height?: number){
    this.address = address;
    this.hash = hash;
    this.height = height;
  }

  static fromJson(json: {[key: string]: any}): AccountHeader{
    return new AccountHeader(
      Address.parse(json['address']),
      Hash.parse(json['hash']),
      json['height']
    );
  }

  toJson(): {[key: string]: any}{
    return {
      address: this.address?.toString(),
      hash: this.hash?.toString(),
      height: this.height
    };
  }

  toString(): string{
    return  JSON.stringify(this.toJson());
  }

}