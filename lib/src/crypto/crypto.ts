import {
  derivePath,
  getPublicKey
} from 'ed25519-hd-key'

import * as ed from '@noble/ed25519';

const { SHA3 } = require('sha3');
class Crypto {
  static getPublicKey(privateKey: Buffer): Promise < Buffer > {
    return new Promise((resolve, reject) => {
      resolve(getPublicKey(privateKey, false));
    })
  }

  static deriveKey(path: string, seed: string): Buffer {
    return derivePath(path, seed).key!;
  }

  static async sign(message: Buffer, privateKey: Buffer, publicKey: Buffer): Promise<Buffer> {
    return Buffer.from(await ed.sign(message, privateKey.toString('hex')));
    }

    static async digest(data: Buffer, digestSize = 32): Promise<Buffer>{
      return SHA3(256).update(data).digest();
    }
}

export {
  Crypto
};