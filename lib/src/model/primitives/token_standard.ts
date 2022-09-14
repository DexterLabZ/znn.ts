import {
  bech32
} from "bech32";

class TokenStandard {
  static prefix: string = 'zts';
  static coreSize: number = 10;

  core: Buffer;

  constructor(core: Buffer) {
    this.core = core;
  }

  toString() {
    if(typeof(this.core) == typeof('string')){
      return this.core.toString();
    }
    else{
      return bech32.encode("zts", bech32.toWords(this.core));
    }
  }

  static parse(str: string) {
    try {
      const {
        prefix,
        words
      } = bech32.decode(str);
      let extractedCore = Buffer.from(bech32.fromWords(words));
      if (prefix !== 'zts') {
        throw `prefix ${prefix} should be 'zts'`
      }
      if (extractedCore.length !== 10) {
        throw `invalid length ${extractedCore.length}; should be 10`;
      }
      return new TokenStandard(extractedCore)
    } catch (e: any) {
      throw `failed to parse TokenStandard. ${e.toString()}`
    }
  }

  getBytes(): Buffer {
    return this.core;
  }

  static isTokenStandard(value: any) {
    return (value.constructor.name === 'TokenStandard')
  }
}

const znnTokenStandard: string = 'zts1znnxxxxxxxxxxxxx9z4ulx';
const qsrTokenStandard: string = 'zts1qsrxxxxxxxxxxxxxmrhjll';
const emptyTokenStandard: string = 'zts1qqqqqqqqqqqqqqqqtq587y';

const znnZts: TokenStandard = TokenStandard.parse(znnTokenStandard);
const qsrZts: TokenStandard = TokenStandard.parse(qsrTokenStandard);
const emptyZts: TokenStandard = TokenStandard.parse(emptyTokenStandard);

export {
  TokenStandard,
  znnTokenStandard,
  qsrTokenStandard,
  emptyTokenStandard,
  znnZts,
  qsrZts,
  emptyZts
}