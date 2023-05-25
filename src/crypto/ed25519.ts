import {
  encode,
} from 'utf8';

import CryptoJS from 'crypto-js';

import nacl from "tweetnacl";
import createHmac from 'create-hmac'

class KeyData {
  key ? : Buffer;
  chainCode ? : Buffer;
  constructor(key ? : Buffer, chainCode ? : Buffer) {
    this.key = key;
    this.chainCode = chainCode;
  }
}
const ed25519Curve = 'ed25519 seed';
const HARDENED_OFFSET = 0x80000000;

const _curveBytes = encode(ed25519Curve);
const _pathRegex = new RegExp("^(m\/)?(\d+'?\/)*\d+'?$");

class Ed25519 {
  constructor() {}

  static getPublicKey(privateKey: Buffer, withZeroByte = true) {
    const keyPair = nacl.sign.keyPair.fromSeed(Uint8Array.from(privateKey));
    const signPk = keyPair.secretKey.subarray(32);
    const zero = Buffer.alloc(1, 0);
    return withZeroByte ?
      Buffer.concat([zero, Buffer.from(signPk)]) :
      Buffer.from(signPk);
  };

  static isValidPath(path: any): boolean {
    if (!ed_utils.pathRegex.test(path)) {
      return false;
    }
    return !path
      .split('/')
      .slice(1)
      .map(ed_utils.replaceDerive)
      .some(isNaN);
  };

  static _getKeys(data: Buffer, keyParameter: Buffer): KeyData {
    const hmac = createHmac('sha512', ed25519Curve);
    const I2 = hmac.update(Buffer.from(data)).digest();
    const IL = I2.toString('hex').slice(0, 32);
    const IR = I2.toString('hex').slice(32);

    return new KeyData(Buffer.from(IL), Buffer.from(IR));
  }

  static getMasterKeyFromSeed(seed: string): KeyData {
    let seedBytes = Buffer.from(seed, "hex");
    return this._getKeys(seedBytes, Buffer.from(_curveBytes));
  };
  // ToDo: replace any
  static derivePath(path: string, seed: string, offset = HARDENED_OFFSET): any {
    if (!this.isValidPath(path)) {
      throw new Error('Invalid derivation path');
    }
    const {
      key,
      chainCode
    } = this.getMasterKeyFromSeed(seed);

    const segments = path
      .split('/')
      .slice(1)
      .map((val: string) => val.replace("'", ''))
      .map((el: string) => parseInt(el, 10));
    return segments.reduce(
      (parentKeys: KeyData, segment: number) => this.CKDPriv(parentKeys, segment + offset), {
        key,
        chainCode
      });
  };

  static CKDPriv_old({
    key,
    chainCode
  }: KeyData, index: number): KeyData {
    const indexBuffer = Buffer.alloc(4);
    indexBuffer.writeUInt32BE(index, 0);
    const data = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(key + ""), indexBuffer]);

    let hmacHasher = CryptoJS.algo.SHA512.create();
    const I = hmacHasher.update(chainCode!.toString()).update(data.toString('hex')).finalize();
    const IL = I.toString().slice(0, 32);
    const IR = I.toString().slice(32);
    return new KeyData(Buffer.from(IL), Buffer.from(IR));
  };

  static CKDPriv({
    key,
    chainCode
  }: KeyData, index: number): KeyData {
    const indexBuffer = Buffer.alloc(4);
    indexBuffer.writeUInt32BE(index, 0);
    const data = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(key+""), indexBuffer]);
    const I = createHmac('sha512', ed25519Curve)
        .update(data)
        .digest();
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR,
    };
  };
}
class ed_utils {
  static pathRegex = new RegExp("^m(\\/[0-9]+')+$");

  static replaceDerive(val: string) {
    return val.replace("'", "");
  }

}

export {
  Ed25519
}