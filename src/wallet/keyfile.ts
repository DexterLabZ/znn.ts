import {
  Address
} from "../model/primitives/address";
import {
  KeyStore
} from "./keystore";

import { aes256gcm } from "./../utils/aes256gcm";
class KeyFile {
  baseAddress ? : Address;
  crypto ? : _Crypto;
  timestamp ? : number;
  version ? : number;

  constructor(baseAddress ? : Address, crypto ? : _Crypto, timestamp ? : number, version ? : number) {
    this.baseAddress = baseAddress;
    this.crypto = crypto;
    this.timestamp = timestamp;
    this.version = version;
  }

  static async encrypt(store: KeyStore, password: string): Promise < KeyFile > {
    let timestamp = Math.floor(Date.now() / 1000);

    // ToDo: error handling
    const _baseAddress = await store.getKeyPair(0).getAddress();

    const _crypto = new _Crypto(
      new _Argon2Params(Buffer.alloc(0)),
      Buffer.alloc(0),
      'aes-256-gcm',
      'argon2.IDKey',
      Buffer.alloc(0)
    );

    let stored = new KeyFile(
      _baseAddress,
      _crypto,
      timestamp,
      1,
    )

    let returned = await stored._encryptEntropy(store, password);
    return returned;
  }

  async decrypt(password: string): Promise<Buffer>{
    if(!this.crypto) {
      throw new Error("No crypto data found");
    }

    let givenBaseAddress = this.baseAddress;
    let salt = this.crypto!.argon2Params!.salt!.toString().substr(2);
    let encrypted = this.crypto!.cipherData!.toString().substr(2);
    let aesNonce = this.crypto!.nonce!.toString().substr(2)

    let key: any;

    if (typeof window === "undefined" || window === null) {
      // For node
      try {        
        const argon2 = (await import("argon2"));
        key = await argon2.hash(
          password,
          {
          salt: Buffer.from(salt, 'hex'),
          timeCost: 1,
          memoryCost: 64 * 1024,
          hashLength: 32,
          type: 2,
          parallelism: 4,
        });
      } catch (err) {
        console.error('argon2 node support is disabled!');
      }
    }else{
      // For browser
      const argon2 = (await import("argon2-browser"));
      key = await argon2.hash({
        pass: password,
        salt: Buffer.from(salt, 'hex'),
        time: 1,
        mem: 64 * 1024,
        hashLen: 32,
        type: argon2.ArgonType.Argon2id,
        parallelism: 4,
      });
    }

    const aesCipher = aes256gcm(key.hash, this.crypto.nonce!);
    let entropy = await aesCipher.decrypt(
                                    Buffer.from(encrypted.substr(0, encrypted.length - 32), 'hex'),
                                    Buffer.from(aesNonce, 'hex'),
                                    Buffer.from(encrypted.substr(encrypted.length - 32, 32), 'hex'),
                                    );

    const kp = new KeyStore().fromEntropy(entropy.toString());
    let baseAddress = await kp.getKeyPair().getAddress();

    if (baseAddress.toString() !== givenBaseAddress?.toString()) {
        throw "invalid base address in keyFile";
    }

    return entropy;
  }

  async _encryptEntropy(store: KeyStore, password: string): Promise<KeyFile> {
    let salt: Buffer = Buffer.alloc(16);
    let nonce: Buffer = Buffer.alloc(12);
    
    if(typeof window !== 'undefined'){
      salt = window.crypto.getRandomValues(Buffer.alloc(16));
      nonce = window.crypto.getRandomValues(Buffer.alloc(12));
    }else{
      let crypto;
      try {
        // crypto = await import('node:crypto');
        crypto = require('node:crypto');
        salt=crypto.randomBytes(16);
        nonce=crypto.randomBytes(12);
      } catch (err) {
        console.error('crypto support is disabled!');
      }
    }

    let key: any;
    if (typeof window === "undefined" || window === null) {
      // For node
      try {        
        const argon2 = (await import("argon2"));
        key = await argon2.hash(
          password,
          {
          salt: salt,
          timeCost: 1,
          memoryCost: 64 * 1024,
          hashLength: 32,
          type: 2,
          parallelism: 4,
        });
      } catch (err) {
        console.error('argon2 node support is disabled!');
      }
    }else{
      // For browser
      const argon2 = (await import("argon2-browser"));
        key = await argon2.hash({
        pass: password,
        salt: salt, 
        mem: 64 * 1024,
        time: 1, // iterations
        parallelism: 4, 
        hashLen: 32, // length
        type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
      })
    }

    const aesCipher = aes256gcm(key.hash, nonce);
    let [encrypted, aesNonce] = await aesCipher.encrypt(store.entropy);
    
    let keyFile = new KeyFile(
      this.baseAddress,
      new _Crypto(
        new _Argon2Params(Buffer.from("0x" + salt.toString('hex'))),
        Buffer.from("0x" + encrypted.toString('hex')),
        'aes-256-gcm',
        'argon2.IDKey',
        Buffer.from("0x" + aesNonce.toString('hex'))
      ),
      Math.floor(Date.now() / 1000),
      1
    )
    return keyFile;
  }

  static fromJson(json: any): KeyFile {
    let data: {[key: string]: any} = {};
    if(json.baseAddress){
      data.baseAddress = new Address(json.baseAddress.hrp, json.baseAddress.core);
    }
    if(json.crypto) {
      data.crypto = _Crypto.fromJson(json.crypto);
    }
    data.timestamp = json.timestamp;
    data.version = json.version;
    
    return new KeyFile(data.baseAddress, data.crypto, data.timestamp, data.version);
  }

  toJson(): any {
    let data: {[key: string]: any} = {};
    if(this.baseAddress){
      data.baseAddress = this.baseAddress.toString();
    }
    if(this.crypto) {
      data.crypto = this.crypto.toJson();
    };
    data.timestamp = this.timestamp;
    data.version = this.version;
    return data;
  }
}

class _Crypto {
  argon2Params ? : _Argon2Params;
  cipherData ? : Buffer;
  cipherName ? : string;
  kdf ? : string;
  nonce ? : Buffer;

  constructor(argon2Params ? : _Argon2Params, cipherData ? : Buffer, cipherName ? : string, kdf ? : string, nonce ? : Buffer) {
    this.argon2Params = argon2Params;
    this.cipherData = cipherData;
    this.cipherName = cipherName;
    this.kdf = kdf;
    this.nonce = nonce;
  }

  static fromJson(json: any): _Crypto {
    const data: {[key: string]: any} = {};
    if(json.argon2Params) {
      data.argon2Params = _Argon2Params.fromJson(json.argon2Params);
    }
    if(json.cipherData) {
      data.cipherData = Buffer.from(json.cipherData, 'hex');
    }
    if(json.cipherName) {
      data.cipherName = json.cipherName;
    }
    if(json.kdf) {
      data.kdf = json.kdf;
    }
    if(json.nonce) {
      data.nonce = Buffer.from(json.nonce, 'hex');
    }
    return new _Crypto(
      data.argon2Params,
      data.cipherData,
      data.cipherName,
      data.kdf,
      data.nonce
    );
  }

  toJson(): {[key: string]: any} {
    const data: {[key: string]: any} = {};
    if(this.argon2Params){
      data.argon2Params = this.argon2Params.toJson();
    }
    if(this.cipherData){
      data.cipherData = this.cipherData.toString('hex');
    }
    if(this.cipherName){
      data.cipherName = this.cipherName;
    }
    if(this.kdf){
      data.kdf = this.kdf;
    }
    if(this.nonce){
      data.nonce = this.nonce.toString('hex');
    }
    return data;
  }
}

class _Argon2Params {
  salt ? : Buffer;

  constructor(salt ? : Buffer) {
    this.salt = salt;
  }

  static fromJson(json: any): _Argon2Params {
    return new _Argon2Params(Buffer.from(json.salt, 'hex'));  
  }

  toJson(): {[key: string]: any} {
    let data: {[key: string]: any} = {};
    if(this.salt){
      data.salt = this.salt.toString('hex');
    }
    return data;
  }
}


export {
  KeyFile
};