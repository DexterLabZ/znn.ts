import {BytesUtils} from "../../utils/bytes";
import {BlockTypeEnum} from "../nom/account_block_template";
import {Address} from "../primitives/address";
import {Hash} from "../primitives/hash";
import BigNumber from "bignumber.js";

export class FusionEntryList {
  qsrAmount: BigNumber;
  count: number;
  list: Array<FusionEntry>;

  constructor(qsrAmount: BigNumber, count: number, list: Array<FusionEntry>) {
    this.qsrAmount = qsrAmount;
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): FusionEntryList {
    return new FusionEntryList(
      new BigNumber(json.qsrAmount.toString()),
      json.count,
      json.list.map((entry: {[key: string]: any}) => FusionEntry.fromJson(entry))
    );
  }

  toJson(): {[key: string]: any} {
    return {
      qsrAmount: this.qsrAmount.toString(),
      count: this.count,
      list: this.list.map((entry: {[key: string]: any}) => entry.toJson()),
    };
  }
}

export class FusionEntry {
  qsrAmount: BigNumber;
  beneficiary: Address;
  expirationHeight: number;
  id: Hash;
  isRevocable?: boolean;

  constructor(qsrAmount: BigNumber, beneficiary: Address, expirationHeight: number, id: Hash, isRevocable: boolean) {
    this.qsrAmount = qsrAmount;
    this.beneficiary = beneficiary;
    this.expirationHeight = expirationHeight;
    this.id = id;
    this.isRevocable = isRevocable;
  }

  static fromJson(json: {[key: string]: any}): FusionEntry {
    return new FusionEntry(
      new BigNumber(json.qsrAmount.toString()),
      Address.parse(json.beneficiary),
      json.expirationHeight,
      Hash.parse(json.id),
      json.isRevocable
    );
  }

  toJson(): {[key: string]: any} {
    return {
      qsrAmount: this.qsrAmount.toString(),
      beneficiary: this.beneficiary.toString(),
      expirationHeight: this.expirationHeight,
      id: this.id.toString(),
    };
  }
}

export class PlasmaInfo {
  currentPlasma: number;
  maxPlasma: number;
  qsrAmount: BigNumber;

  constructor(currentPlasma: number, maxPlasma: number, qsrAmount: BigNumber) {
    this.currentPlasma = currentPlasma;
    this.maxPlasma = maxPlasma;
    this.qsrAmount = qsrAmount;
  }

  static fromJson(json: {[key: string]: any}): PlasmaInfo {
    return new PlasmaInfo(json.currentPlasma, json.maxPlasma, new BigNumber(json.qsrAmount.toString()));
  }

  toJson(): {[key: string]: any} {
    return {
      currentPlasma: this.currentPlasma,
      maxPlasma: this.maxPlasma,
      qsrAmount: this.qsrAmount.toString(),
    };
  }
}
export class GetRequiredParam {
  address: Address;
  blockType: number;
  toAddress?: Address;

  data?: Buffer;

  constructor(address: Address, blockType: number, toAddress?: Address, data?: Buffer) {
    if (blockType == BlockTypeEnum.userReceive) {
      toAddress = address;
    }
    this.address = address;
    this.blockType = blockType;
    this.toAddress = toAddress;
    // ToDo: Check if data is undefined
    this.data = data;
  }

  static fromJson(json: {[key: string]: any}): GetRequiredParam {
    return new GetRequiredParam(
      Address.parse(json.address),
      json.blockType,
      Address.parse(json.toAddress) == undefined ? undefined : Address.parse(json.toAddress),
      Buffer.from(json.data, "hex")
    );
  }

  toJson(): {[key: string]: any} {
    return {
      address: this.address.toString(),
      blockType: this.blockType,
      toAddress: this.toAddress == undefined ? undefined : this.toAddress.toString(),
      // Q&A: Dart sdk doesn't do error handling for data
      data: this.data == undefined ? undefined : BytesUtils.bytesToBase64(this.data),
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export class GetRequiredResponse {
  availablePlasma: number;
  basePlasma: number;
  requiredDifficulty: number;

  constructor(availablePlasma: number, basePlasma: number, requiredDifficulty: number) {
    this.availablePlasma = availablePlasma;
    this.basePlasma = basePlasma;
    this.requiredDifficulty = requiredDifficulty;
  }

  static fromJson(json: {[key: string]: any}): GetRequiredResponse {
    return new GetRequiredResponse(json.availablePlasma, json.basePlasma, json.requiredDifficulty);
  }

  toJson(): {[key: string]: any} {
    return {
      availablePlasma: this.availablePlasma,
      basePlasma: this.basePlasma,
      requiredDifficulty: this.requiredDifficulty,
    };
  }
}
