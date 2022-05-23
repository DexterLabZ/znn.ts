const {
  SHA3
} = require('sha3');
let {
  bech32
} = require('bech32')

const SHA3_PADDING = [6, 1536, 393216, 100663296];
const NORMAL_BITS = [224, 256, 384, 512];

class Address {
  static prefix: string = 'z';
  static addressLength: number = 40;
  static userByte: number = 0;
  static contractByte: number = 1;
  static coreSize: number = 20;

  hrp: string;
  core: Buffer;

  constructor(hrp: string, core: Buffer) {
    this.hrp = hrp;
    this.core = core;
  }

  static parse(address: string): Address {
    const {
      prefix,
      words
    } = bech32.decode(address);
    let extractedCore = Buffer.from(bech32.fromWords(words));
    if (prefix !== Address.prefix) {
      throw `invalid prefix ${prefix}; should be Address.prefix`
    }
    if (extractedCore.length !== 20) {
      throw `invalid length ${extractedCore.length}; should be 20`;
    }
    return new Address(prefix, extractedCore)
  }

  // @override
  toString(): string {
    return bech32.encode(this.hrp, bech32.toWords(Buffer.from(this.core)));
  }

  static fromPublicKey(publicKey: Buffer): Address {
    let sha3 = new SHA3(NORMAL_BITS[1], SHA3_PADDING, SHA3_PADDING[1]);
    sha3.update(publicKey);
    let digest = sha3.digest().subarray(0, 19);

    return new Address(this.prefix, Buffer.concat([Buffer.from([this.userByte]), Buffer.from(digest)]));
  }

  getBytes(): Buffer {
    return this.core;
  }

  static isAddress(value: any) {
    return (value.constructor.name === 'Address')
  }
}


export const emptyAddress: Address =
  Address.parse('z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f');
export const plasmaAddress: Address =
  Address.parse('z1qxemdeddedxplasmaxxxxxxxxxxxxxxxxsctrp');
export const pillarAddress: Address =
  Address.parse('z1qxemdeddedxpyllarxxxxxxxxxxxxxxxsy3fmg');
export const tokenAddress: Address =
  Address.parse('z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0');
export const sentinelAddress: Address =
  Address.parse('z1qxemdeddedxsentynelxxxxxxxxxxxxxwy0r2r');
export const swapAddress: Address =
  Address.parse('z1qxemdeddedxswapxxxxxxxxxxxxxxxxxxl4yww');
export const stakeAddress: Address =
  Address.parse('z1qxemdeddedxstakexxxxxxxxxxxxxxxxjv8v62');
export const sporkAddress: Address =
  Address.parse('z1qxemdeddedxsp0rkxxxxxxxxxxxxxxxx956u48');
export const acceleratorAddress: Address =
  Address.parse('z1qxemdeddedxaccelerat0rxxxxxxxxxxp4tk22');

export {
  Address
};