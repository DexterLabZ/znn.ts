import {BytesUtils} from "../../utils/bytes";
import {Zenon} from "../../zenon";
import {Address, emptyAddress} from "../primitives/address";
import {emptyHash, Hash} from "../primitives/hash";
import {emptyHashHeight, HashHeight} from "../primitives/hash_height";
import {emptyTokenStandard, TokenStandard} from "../primitives/token_standard";
import {BigNumber, ethers} from "ethers";

export enum BlockTypeEnum {
  unknown = 0,
  genesisReceive = 1,
  userSend = 2,
  userReceive = 3,
  contractSend = 4,
  contractReceive = 5,
}

export class AccountBlockTemplate {
  version: number;
  chainIdentifier: number;
  blockType: number;

  hash: Hash;
  previousHash: Hash;
  height: number;
  momentumAcknowledged: HashHeight;

  address: Address;

  // Send information
  toAddress: Address;

  amount: BigNumber;
  tokenStandard: TokenStandard;
  fromBlockHash: Hash;

  data: Buffer;

  // PoW
  fusedPlasma: number;
  difficulty: number;

  // Hex representation of 8byte none
  nonce: string;

  publicKey: Buffer;
  signature: Buffer;

  constructor(
    version: number = 1,
    chainIdentifier: number = Zenon.getChainIdentifier(),
    blockType: number,
    hash: Hash = emptyHash,
    previousHash: Hash = emptyHash,
    height: number = 0,
    momentumAcknowledged: HashHeight = emptyHashHeight,
    address: Address = emptyAddress,
    toAddress: Address = emptyAddress,
    amount: BigNumber = ethers.BigNumber.from("0"),
    tokenStandard: TokenStandard = TokenStandard.parse(emptyTokenStandard),
    fromBlockHash: Hash = emptyHash,
    data: Buffer = Buffer.from([]),
    fusedPlasma: number = 0,
    difficulty: number = 0,
    nonce: string = "",
    publicKey: Buffer = Buffer.from([]),
    signature: Buffer = Buffer.from([])
  ) {
    this.version = version;
    this.chainIdentifier = chainIdentifier;
    this.blockType = blockType;
    this.hash = hash;
    this.previousHash = previousHash;
    this.height = height;
    this.momentumAcknowledged = momentumAcknowledged;
    this.address = address;
    this.toAddress = toAddress;
    this.amount = amount;
    this.tokenStandard = tokenStandard;
    this.fromBlockHash = fromBlockHash;
    this.data = data;
    this.fusedPlasma = fusedPlasma;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.publicKey = publicKey;
    this.signature = signature;
  }

  static fromJson(json: {[key: string]: any}): AccountBlockTemplate {
    return new AccountBlockTemplate(
      json["version"],
      json["chainIdentifier"],
      json["blockType"],
      Hash.parse(json["hash"]),
      Hash.parse(json["previousHash"]),
      json["height"],
      HashHeight.fromJson(json["momentumAcknowledged"]),
      Address.parse(json["address"]),
      Address.parse(json["toAddress"]),
      ethers.BigNumber.from(json["amount"].toString()),
      TokenStandard.parse(json["tokenStandard"]),
      Hash.parse(json["fromBlockHash"]),
      json["data"] == null
        ? Buffer.from([])
        : json["data"] == ""
        ? Buffer.from([])
        : Buffer.from(json["data"], "base64")!,
      json["fusedPlasma"],
      json["difficulty"],
      json["nonce"],
      (json["publicKey"] != null ? Buffer.from(json["publicKey"]) : Buffer.from([]))!,
      (json["signature"] != null ? Buffer.from(json["signature"]) : Buffer.from([]))!
    );
  }

  toJson(): {[key: string]: any} {
    return {
      version: this.version,
      chainIdentifier: this.chainIdentifier,
      blockType: this.blockType,
      hash: this.hash.toString(),
      previousHash: this.previousHash.toString(),
      height: this.height,
      momentumAcknowledged: this.momentumAcknowledged.toJson(),
      address: this.address.toString(),
      toAddress: this.toAddress.toString(),
      amount: this.amount.toString(),
      tokenStandard: this.tokenStandard.toString(),
      fromBlockHash: this.fromBlockHash.toString(),
      data: BytesUtils.bytesToBase64(this.data),
      fusedPlasma: this.fusedPlasma,
      difficulty: this.difficulty,
      nonce: this.nonce,
      publicKey: BytesUtils.bytesToBase64(this.publicKey),
      signature: BytesUtils.bytesToBase64(this.signature),
    };
  }

  static receive(fromBlockHash: Hash) {
    return new AccountBlockTemplate(
      undefined,
      undefined,
      BlockTypeEnum.userReceive,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      fromBlockHash,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }

  static send(toAddress: Address, tokenStandard: TokenStandard, amount: BigNumber) {
    return new AccountBlockTemplate(
      undefined,
      undefined,
      BlockTypeEnum.userSend,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      toAddress,
      amount,
      tokenStandard,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }

  static callContract(address: Address, tokenStandard: TokenStandard, amount: BigNumber, data: Buffer) {
    const block = new AccountBlockTemplate(
      undefined,
      undefined,
      BlockTypeEnum.userSend,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      address,
      amount,
      tokenStandard,
      undefined,
      data,
      undefined,
      undefined,
      undefined,
      undefined
    );
    return block;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
