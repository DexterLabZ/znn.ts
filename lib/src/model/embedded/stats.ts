import {Address} from "../primitives/address";

export class ExtraData {
  affiliate: Address;

  constructor(affiliate: Address) {
    this.affiliate = affiliate;
  }

  static fromJson(json: {[key: string]: any}): ExtraData {
    return new ExtraData(Address.parse(json.affiliate));
  }

  toJson(): {[key: string]: any} {
    return {
      affiliate: this.affiliate.toString(),
    };
  }
}
