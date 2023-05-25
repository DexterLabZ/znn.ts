import { Crypto } from "../../crypto/crypto";

import { BytesUtils } from "../../utils/bytes";

export class Hash{
  hash: Buffer;
  static _length: number = 32;
  
  constructor(hash: Buffer){
    this.hash = hash;
  }
  
  static parse(hash: string): Hash{
    if (hash.length != 2 * Hash._length) {
      throw Error('Invalid hash _length');
    }
    return new Hash(Buffer.from(hash, "hex"));
  }
  
  static async digest(data: Buffer): Promise<Hash>{
    return new Hash(await Crypto.digest(data));  
  }

  getBytes(): Buffer{
    return this.hash;
  }
  
  toString(){
    return BytesUtils.bytesToHex(this.hash);
  }
}

export const emptyHash = Hash.parse("0000000000000000000000000000000000000000000000000000000000000000");