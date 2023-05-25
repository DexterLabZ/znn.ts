import { BytesUtils } from "../../utils/bytes";
import { emptyHash, Hash } from "./hash";

export class HashHeight{
  hash?: Hash;
  height?: number;

  constructor(hash: Hash, height: number){
    this.hash = hash;
    this.height = height;
  }

  static fromJson(json: {[key: string]: any}): HashHeight{
    return new HashHeight(
      Hash.parse(json['hash']),
      json['height']
    );
  }

  toJson(): {[key: string]: any}{
    return {
      hash: this.hash?.toString() || emptyHash.toString(),
      height: this.height
    };
  }

  toString(): string{
    return JSON.stringify(this.toJson());
  }

  getBytes(): Buffer{
    return Buffer.concat([
      this.hash?.getBytes() || emptyHash.getBytes(),
      BytesUtils.longToBytes(this.height!)
    ]);
  }
}

export const emptyHashHeight = new HashHeight(emptyHash, 0);
