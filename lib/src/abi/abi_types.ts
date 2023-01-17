import {
  BytesUtils
} from "../utils/bytes";
import {toBigIntBE, toBufferBE} from 'bigint-buffer';
import { Address } from "../model/primitives/address";
import { TokenStandard } from "../model/primitives/token_standard";
import { Hash } from "../model/primitives/hash";
export abstract class AbiType {
  static int32Size: number = 32;
  name ? : string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string | undefined {
    return this.name;
  }

  getCanonicalName(): string | undefined {
    return this.getName();
  }

  static getType(typeName: string): AbiType {
    if (typeName.includes('[')) return ArrayType.getType(typeName);
    if ('bool' == typeName) return new BoolType();
    if (typeName.startsWith('int')) return new IntType(typeName);
    if (typeName.startsWith('uint')) return new UnsignedIntType(typeName);
    if ('address' == typeName) return new AddressType();
    if ('tokenStandard' == typeName) return new TokenStandardType();
    if ('string' == typeName) return new StringType();
    if ('bytes' == typeName) return BytesType.bytes();
    if ('hash' == (typeName)) return new HashType(typeName);

    throw Error(`The type ${typeName} is not supported`);
  }

  abstract encode(value: Object): Buffer;

  // ToDo: Set default offset when implementing decode function
  abstract decode(encoded: Buffer, offset ? : number): Object;

  getFixedSize(): number {
    return 32
  }

  isDynamicType() {
    return false;
  }

  toString(): string {
    return this.getName() !;
  }
}

abstract class ArrayType extends AbiType{
  elementType: any;

  constructor(name: string) {
    super(name);
    const idx = name.indexOf('[');
    const st = name.substring(0, idx);
    const idx2 = name.indexOf(']', idx);
    const subDim = idx2 + 1 == name.length ? '' : name.substring(idx2 + 1);
    this.elementType = AbiType.getType(st + subDim);
  }

  static getType(typeName: string): ArrayType{
    const idx1 = typeName.indexOf('[');
    const idx2 = typeName.indexOf(']', idx1);
    if (idx1 + 1 == idx2) {
      return new DynamicArrayType(typeName);
    } else {
      return new StaticArrayType(typeName);
    }
  }

  getElementType(): AbiType {
    return this.elementType;
  }

  encode(value: any): Buffer{
    if(Array.isArray(value)){
      return this.encodeList(value);
    }
    else if(typeof value == 'string'){
      return this.encodeList(Array.from(value));
    } else {
      throw Error();
    }
  }

  encodeTuple(l: Array<any>){
    let elements: Array<Buffer> = [];
    if(this.elementType.isDynamicType()){
    let offset = l.length * AbiType.int32Size
    for(let i = 0; i < l.length; i++){
      elements[i] = IntType.encodeInt(offset);
      let encoded: Buffer = this.elementType.encode(l[i]);
      elements[l.length + i] = encoded;
      offset += (AbiType.int32Size *
        ((encoded.length - 1) / AbiType.int32Size + 1));
      }
    }
    else{
      // elements = Buffer.alloc(l.length);
      for (let i = 0; i < l.length; i++) {
        elements[i] = this.elementType.encode(l[i]);
      }
    }
    return Buffer.concat(elements);
  }

  abstract encodeList(value: any): Buffer;

  // ToDo: implement encodeTuple, decodeTuple
}

class DynamicArrayType extends ArrayType{
  constructor(name: string){
    super(name);
  }

  getCanonicalName(): string | undefined {
    return this.elementType.getCanonicalName() + "[]";
  }

  encodeList(l: Array<any>): Buffer{
    return Buffer.from(l.map(e => this.elementType.encode(e)));
  }

  decode(encoded: Buffer, origOffset: number = 0): any {
    // ToDo: implement this
    throw Error('Not implemented');
  }

  isDynamicType(): boolean {
    return true;
  }
}

class StaticArrayType extends ArrayType{
  size = 0;
  constructor(name: string){
    super(name);
    let idx1 = name.indexOf('[');
    let idx2 = name.indexOf(']', idx1);
    let dim = name.substring(idx1 + 1, idx2);
    this.size = parseInt(dim);
  }

  getCanonicalName(): string | undefined {
    return this.elementType.getCanonicalName() + "[" + this.size + "]";
  }

  encodeList(l: Array<any>): Buffer{
    if(l.length != this.size){
      throw Error('Array size does not match');
    }

    return this.encodeTuple(l);
  }

  decode(encoded: Buffer, origOffset: number = 0): any {
    let result = Buffer.alloc(this.size);
    for(let i = 0; i < this.size; i++){
      result[i] = this.elementType.decode(encoded, origOffset + i * this.elementType.getFixedSize());
    }
    return result;
  }
}

class BytesType extends AbiType{
  constructor(name: string) {
    super(name);
  }

  static bytes(): BytesType{
    return new BytesType('bytes');
  }

  encode(value: any): Buffer{
    let bb: Buffer;


    if (typeof value == 'string') {
      bb = Buffer.from(value);
    } else if(Buffer.isBuffer(value)){
      bb = value;
    }
    else{
      throw Error();
    }

    let returned = Buffer.alloc(Math.round(((bb.length - 1) / AbiType.int32Size) + 1) * AbiType.int32Size);

    for (let i = 0; i < returned.length; i++) {
      returned[i] = 0;
    }

    BytesUtils.arraycopy(bb, 0, returned, 0, bb.length);

    return Buffer.concat([IntType.encodeInt(bb.length), returned]);


  }

  decode(encoded: Buffer, offset = 0): any {
    return Buffer.from(IntType.decodeInt(encoded, offset).toString());
  }

  isDynamicType(): boolean {
      return true;
  }
} 

class StringType extends BytesType{
  constructor() {
    super("string");
  }

  encode(value: Object): Buffer {
    if (typeof value == 'string') {
      // console.log("encoding string");
      let returned = super.encode(Buffer.from(value));
      return returned;
    } else {
      throw Error();
    }
  }

  decode(encoded: Buffer, offset?: number): any {
    return super.decode(encoded, offset);   
  }
}
abstract class NumericType extends AbiType {
  constructor(name: string) {
    super(name);
  }

  encodeInternal(value ? : any): bigint {
    // console.log("encoding internal");
    let bigInt: bigint;
    if (typeof value == 'string') {
      // console.log("is string");
      let s = value.toLowerCase().trim();
      let radix = 10;
      if (s.startsWith('0x')) {
        s = s.substring(2);
        radix = 16;
      } else if (s.includes('a') ||
        s.includes('b') ||
        s.includes('c') ||
        s.includes('d') ||
        s.includes('e') ||
        s.includes('f')) {
        radix = 16;
      }
      bigInt = BigInt(s);
    } else if (typeof value == 'bigint') {
      // console.log("is bigint");
      // ToDo: here lies the problem
      // We should only use bigint instead of string for amount, maxSupply, totalSupply 
      bigInt = value;
    } else if (typeof value == 'number') {
      // console.log("is number");
      bigInt = BigInt(value);
    } else if (Buffer.isBuffer(value)) {
      // console.log("is Buffer");
      // ToDo: Test if this is alright
      bigInt = BigInt(value.toString());
    } else {
      throw Error();
    }
    return bigInt;
  }
}

export class UnsignedIntType extends NumericType {
  constructor(name: string) {
    super(name);
  }

  getCanonicalName(): string | undefined {
    if (super.getName() == 'uint') return 'uint256';
    return super.getCanonicalName();
  }

  static encodeInt(i: number): Buffer {
    return UnsignedIntType.encodeIntBig(BigInt(i));
  }

  static encodeIntBig(bigInt: bigint): Buffer {
    if (bigInt < 0) throw Error();
    return toBufferBE(bigInt, 32);
  }

  encode(value: any): Buffer {
    let bigInt = super.encodeInternal(value);
    return UnsignedIntType.encodeIntBig(bigInt);
  }

  decode(encoded: Buffer, offset: number = 0): any {
    // ToDo: implement this and decodeIntBig
    return Buffer.from("");
  }
}
export class IntType extends NumericType {
  constructor(name: string) {
    super(name);
  }

  getCanonicalName(): string | undefined {
    if (super.getName() == 'int') return 'int256';
    return super.getCanonicalName();
  }

  static encodeInt(i: number): Buffer {
    return IntType.encodeIntBig(BigInt(i));
  }

  static encodeIntBig(bigInt: bigint): Buffer {
    return toBufferBE(bigInt, AbiType.int32Size);
  }

  static decodeInt(encoded: Buffer, offset: number): bigint {
    return toBigIntBE(encoded.subarray(offset, offset + 32));
  }

  encode(value: any): Buffer {
    let bigInt = super.encodeInternal(value);
    return IntType.encodeIntBig(bigInt);
  }

  decode(encoded: Buffer, offset: number = 0): any {
    // ToDo: implement this
    console.error("Implement this");
    return Buffer.from("");
  }
}

class BoolType extends IntType{
  constructor(){
    super("bool");
  }
  
  encode(value: any): Buffer {
    if (typeof value == "string") {
      return super.encode(value == 'true' ? 1 : 0);
    } else if (typeof value == "boolean") {
      return super.encode(value == true ? 1 : 0);
    }
    throw Error();
  }
}
class AddressType extends IntType{
  constructor(){
    super("address");
  }

  encode(value: any): Buffer {
    if(typeof value == "string"){
      return BytesUtils.leftPadBytes(Address.parse(value).getBytes(), 32);
    }
    if(Address.isAddress(value)){
      return BytesUtils.leftPadBytes(value.getBytes(), 32);
    }
    throw Error();
  }
  // ToDo: implement decode
}

class TokenStandardType extends IntType{
  constructor(){
    super("tokenStandard");
  }

  encode(value: any): Buffer {
    if(typeof value == "string"){
      return BytesUtils.leftPadBytes(TokenStandard.parse(value).getBytes(), 32);
    }
    if(TokenStandard.isTokenStandard(value)){
      return BytesUtils.leftPadBytes(value.getBytes(), 32);
    }
    throw Error();
  }
}

class HashType extends AbiType{
  constructor(s: any){
    super(s);
  }

  encode(value: any): Buffer {
    if(typeof value == "number"){
      let returned = IntType.encodeIntBig(BigInt(value));
      return returned;
    }
    else if(typeof value == "string"){
      let returned = BytesUtils.leftPadBytes(Hash.parse(value).getBytes(), AbiType.int32Size);
      return returned;
    }
    else if(Buffer.isBuffer(value)){
      let returned = BytesUtils.leftPadBytes(value, AbiType.int32Size)
      return returned;
    }

    throw Error();
  }

  decode(encoded: Buffer, offset: number = 0): any {
    let l = Buffer.alloc(AbiType.int32Size);
    BytesUtils.arraycopy(encoded, offset, l, 0, this.getFixedSize());
    return Hash.digest(l);
  }
}