import { Address } from "../primitives/address";
import { Hash } from "./../primitives/hash";
import { AccountHeader } from "./account_header";
export class Momentum{
  version: number;
  chainIdentifier: number; 
  hash: Hash;
  previousHash: Hash;
  height: number;
  timestamp: number;

  data: Buffer;
  content: Array<AccountHeader>;
  changesHash?: Hash;

  publicKey: string;
  signature: string;
  producer: Address;

  constructor(version: number, chainIdentifier: number, hash: Hash, previousHash: Hash, height: number, timestamp: number, data: Buffer, content: Array<AccountHeader>, changesHash: Hash, publicKey: string, signature: string, producer: Address){
    this.version = version;
    this.chainIdentifier = chainIdentifier;
    this.hash = hash;
    this.previousHash = previousHash;
    this.height = height;
    this.timestamp = timestamp;
    this.data = data;
    this.content = content;
    this.changesHash = changesHash;
    this.publicKey = publicKey;
    this.signature = signature;
    this.producer = producer;
  }
    
  // ToDo: continue this.
  static fromJson(json: {[key: string]: any}): Momentum{
    return new Momentum(
      json.version,
      json.chainIdentifier,
      Hash.parse(json.hash),
      Hash.parse(json.previousHash),
      json.height,
      json.timestamp,
      Buffer.from(json.data, 'hex'),
      json.content?.map((j: {[key: string]: any}) => {
        return AccountHeader.fromJson(j);
      }),
      Hash.parse(json.changesHash),
      json.publicKey || '',
      json.signature || '',
      Address.parse(json.producer)
    );
  }

  toJson(): {[key: string]: any}{
    return {
      version: this.version,
      chainIdentifier: this.chainIdentifier,
      hash: this.hash.toString(),
      previousHash: this.previousHash.toString(),
      height: this.height,
      timestamp: this.timestamp,
      data: this.data.toString('hex'),
      content: this.content.map((c: AccountHeader) => {
        return c.toString();
      }),
      changesHash: this.changesHash?.toString(),
      publicKey: this.publicKey,
      signature: this.signature,
      producer: this.producer.toString()
    };
  }
}

export class MomentumList{
  count: number;
  list: Array<Momentum>;

  constructor(count: number, list: Array<Momentum>){
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): MomentumList{
    return new MomentumList(
      json.count,
      json.list?.map((j: {[key: string]: any}) => {
        return Momentum.fromJson(j);
      })
    );
  }

  toJson(): {[key: string]: any}{
    return {
      count: this.count,
      list: this.list.map((m: Momentum) => {
        return m.toJson();
      })
    };
  }
}