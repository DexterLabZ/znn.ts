import {
  Address
} from "../model/primitives/address";
import{ Crypto } from "../crypto/crypto";
class KeyPair {
  privateKey : Buffer ;
  publicKey ? : Buffer ;
  _address ? : Address;

  constructor(privateKey : Buffer , publicKey ? : Buffer , address ? : Address) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this._address = address;
  }

  async generateKeyPair(privateKey?: Buffer): Promise<KeyPair>{
    if(privateKey) this.privateKey = privateKey;
    this._address = await this.getAddress();

    return this;
  }

  getPrivateKey(): Buffer {
    return this.privateKey;
  }

  async getPublicKey(): Promise<Buffer> {
    this.publicKey ??= await Crypto.getPublicKey(this.privateKey);
    return this.publicKey;
  }

  async getAddress(): Promise<Address> {
    if(this._address == undefined) {
      this.publicKey = await this.getPublicKey();
      this._address = Address.fromPublicKey(this.publicKey!);
    }
    return this._address;
  }

  async sign(message: Buffer): Promise<Buffer>{
    const signed = await Crypto.sign(message, this.privateKey, (await this.getPublicKey()));
    return signed;
  }

}

export {
  KeyPair
};