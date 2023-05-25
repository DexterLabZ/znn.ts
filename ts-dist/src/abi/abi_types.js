"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntType = exports.UnsignedIntType = exports.AbiType = void 0;
const bytes_1 = require("../utils/bytes");
const bigint_buffer_1 = require("bigint-buffer");
const address_1 = require("../model/primitives/address");
const token_standard_1 = require("../model/primitives/token_standard");
const hash_1 = require("../model/primitives/hash");
class AbiType {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getCanonicalName() {
        return this.getName();
    }
    static getType(typeName) {
        if (typeName.includes("["))
            return ArrayType.getType(typeName);
        if ("bool" == typeName)
            return new BoolType();
        if (typeName.startsWith("int"))
            return new IntType(typeName);
        if (typeName.startsWith("uint"))
            return new UnsignedIntType(typeName);
        if ("address" == typeName)
            return new AddressType();
        if ("tokenStandard" == typeName)
            return new TokenStandardType();
        if ("string" == typeName)
            return new StringType();
        if ("bytes" == typeName)
            return BytesType.bytes();
        if ("hash" == typeName)
            return new HashType(typeName);
        throw Error(`The type ${typeName} is not supported`);
    }
    getFixedSize() {
        return 32;
    }
    isDynamicType() {
        return false;
    }
    toString() {
        return this.getName();
    }
}
exports.AbiType = AbiType;
AbiType.int32Size = 32;
class ArrayType extends AbiType {
    constructor(name) {
        super(name);
        const idx = name.indexOf("[");
        const st = name.substring(0, idx);
        const idx2 = name.indexOf("]", idx);
        const subDim = idx2 + 1 == name.length ? "" : name.substring(idx2 + 1);
        this.elementType = AbiType.getType(st + subDim);
    }
    static getType(typeName) {
        const idx1 = typeName.indexOf("[");
        const idx2 = typeName.indexOf("]", idx1);
        if (idx1 + 1 == idx2) {
            return new DynamicArrayType(typeName);
        }
        else {
            return new StaticArrayType(typeName);
        }
    }
    getElementType() {
        return this.elementType;
    }
    encode(value) {
        if (Array.isArray(value)) {
            return this.encodeList(value);
        }
        else if (typeof value == "string") {
            return this.encodeList(Array.from(value));
        }
        else {
            throw Error();
        }
    }
    encodeTuple(l) {
        let elements = [];
        if (this.elementType.isDynamicType()) {
            let offset = l.length * AbiType.int32Size;
            for (let i = 0; i < l.length; i++) {
                elements[i] = IntType.encodeInt(offset);
                let encoded = this.elementType.encode(l[i]);
                elements[l.length + i] = encoded;
                offset += AbiType.int32Size * ((encoded.length - 1) / AbiType.int32Size + 1);
            }
        }
        else {
            // elements = Buffer.alloc(l.length);
            for (let i = 0; i < l.length; i++) {
                elements[i] = this.elementType.encode(l[i]);
            }
        }
        return Buffer.concat(elements);
    }
}
class DynamicArrayType extends ArrayType {
    constructor(name) {
        super(name);
    }
    getCanonicalName() {
        return this.elementType.getCanonicalName() + "[]";
    }
    encodeList(l) {
        return Buffer.from(l.map((e) => this.elementType.encode(e)));
    }
    decode(encoded, origOffset = 0) {
        // ToDo: implement this
        throw Error("Not implemented");
    }
    isDynamicType() {
        return true;
    }
}
class StaticArrayType extends ArrayType {
    constructor(name) {
        super(name);
        this.size = 0;
        let idx1 = name.indexOf("[");
        let idx2 = name.indexOf("]", idx1);
        let dim = name.substring(idx1 + 1, idx2);
        this.size = parseInt(dim);
    }
    getCanonicalName() {
        return this.elementType.getCanonicalName() + "[" + this.size + "]";
    }
    encodeList(l) {
        if (l.length != this.size) {
            throw Error("Array size does not match");
        }
        return this.encodeTuple(l);
    }
    decode(encoded, origOffset = 0) {
        let result = Buffer.alloc(this.size);
        for (let i = 0; i < this.size; i++) {
            result[i] = this.elementType.decode(encoded, origOffset + i * this.elementType.getFixedSize());
        }
        return result;
    }
}
class BytesType extends AbiType {
    constructor(name) {
        super(name);
    }
    static bytes() {
        return new BytesType("bytes");
    }
    encode(value) {
        let bb;
        if (typeof value == "string") {
            bb = Buffer.from(value);
        }
        else if (Buffer.isBuffer(value)) {
            bb = value;
        }
        else {
            throw Error();
        }
        let returned = Buffer.alloc(Math.round((bb.length - 1) / AbiType.int32Size + 1) * AbiType.int32Size);
        for (let i = 0; i < returned.length; i++) {
            returned[i] = 0;
        }
        bytes_1.BytesUtils.arraycopy(bb, 0, returned, 0, bb.length);
        return Buffer.concat([IntType.encodeInt(bb.length), returned]);
    }
    decode(encoded, offset = 0) {
        return Buffer.from(IntType.decodeInt(encoded, offset).toString());
    }
    isDynamicType() {
        return true;
    }
}
class StringType extends BytesType {
    constructor() {
        super("string");
    }
    encode(value) {
        if (typeof value == "string") {
            // console.log("encoding string");
            let returned = super.encode(Buffer.from(value));
            return returned;
        }
        else {
            throw Error();
        }
    }
    decode(encoded, offset) {
        return super.decode(encoded, offset);
    }
}
class NumericType extends AbiType {
    constructor(name) {
        super(name);
    }
    encodeInternal(value) {
        console.log("encoding internal");
        let bigInt;
        if (typeof value == "string") {
            console.log("is string");
            let s = value.toLowerCase().trim();
            let radix = 10;
            if (s.startsWith("0x")) {
                s = s.substring(2);
                radix = 16;
            }
            else if (s.includes("a") ||
                s.includes("b") ||
                s.includes("c") ||
                s.includes("d") ||
                s.includes("e") ||
                s.includes("f")) {
                radix = 16;
            }
            bigInt = BigInt(s);
        }
        else if (typeof value == "bigint") {
            console.log("is bigint");
            // ToDo: here lies the problem
            // We should only use bigint instead of string for amount, maxSupply, totalSupply
            bigInt = value;
        }
        else if (typeof value == "number") {
            console.log("is number");
            bigInt = BigInt(value);
            // bigInt = BigNumber(value);
        }
        else if (Buffer.isBuffer(value)) {
            console.log("is Buffer");
            // ToDo: Test if this is alright
            bigInt = BigInt(value.toString());
        }
        else {
            throw Error();
        }
        return bigInt;
    }
}
class UnsignedIntType extends NumericType {
    constructor(name) {
        super(name);
    }
    getCanonicalName() {
        if (super.getName() == "uint")
            return "uint256";
        return super.getCanonicalName();
    }
    static encodeInt(i) {
        return UnsignedIntType.encodeIntBig(BigInt(i));
    }
    static encodeIntBig(bigInt) {
        if (bigInt < 0)
            throw Error();
        return (0, bigint_buffer_1.toBufferBE)(bigInt, 32);
    }
    encode(value) {
        let bigInt = super.encodeInternal(value);
        return UnsignedIntType.encodeIntBig(bigInt);
    }
    decode(encoded, offset = 0) {
        // ToDo: implement this and decodeIntBig
        return Buffer.from("");
    }
}
exports.UnsignedIntType = UnsignedIntType;
class IntType extends NumericType {
    constructor(name) {
        super(name);
    }
    getCanonicalName() {
        if (super.getName() == "int")
            return "int256";
        return super.getCanonicalName();
    }
    static encodeInt(i) {
        return IntType.encodeIntBig(BigInt(i));
    }
    static encodeIntBig(bigInt) {
        return (0, bigint_buffer_1.toBufferBE)(bigInt, AbiType.int32Size);
    }
    static decodeInt(encoded, offset) {
        return (0, bigint_buffer_1.toBigIntBE)(encoded.subarray(offset, offset + 32));
    }
    encode(value) {
        let bigInt = super.encodeInternal(value);
        return IntType.encodeIntBig(bigInt);
    }
    decode(encoded, offset = 0) {
        // ToDo: implement this
        console.error("Implement this");
        return Buffer.from("");
    }
}
exports.IntType = IntType;
class BoolType extends IntType {
    constructor() {
        super("bool");
    }
    encode(value) {
        if (typeof value == "string") {
            return super.encode(value == "true" ? 1 : 0);
        }
        else if (typeof value == "boolean") {
            return super.encode(value == true ? 1 : 0);
        }
        throw Error();
    }
}
class AddressType extends IntType {
    constructor() {
        super("address");
    }
    encode(value) {
        if (typeof value == "string") {
            return bytes_1.BytesUtils.leftPadBytes(address_1.Address.parse(value).getBytes(), 32);
        }
        if (address_1.Address.isAddress(value)) {
            return bytes_1.BytesUtils.leftPadBytes(value.getBytes(), 32);
        }
        throw Error();
    }
}
class TokenStandardType extends IntType {
    constructor() {
        super("tokenStandard");
    }
    encode(value) {
        if (typeof value == "string") {
            return bytes_1.BytesUtils.leftPadBytes(token_standard_1.TokenStandard.parse(value).getBytes(), 32);
        }
        if (token_standard_1.TokenStandard.isTokenStandard(value)) {
            return bytes_1.BytesUtils.leftPadBytes(value.getBytes(), 32);
        }
        throw Error();
    }
}
class HashType extends AbiType {
    constructor(s) {
        super(s);
    }
    encode(value) {
        if (typeof value == "number") {
            let returned = IntType.encodeIntBig(BigInt(value));
            return returned;
        }
        else if (typeof value == "string") {
            let returned = bytes_1.BytesUtils.leftPadBytes(hash_1.Hash.parse(value).getBytes(), AbiType.int32Size);
            return returned;
        }
        else if (Buffer.isBuffer(value)) {
            let returned = bytes_1.BytesUtils.leftPadBytes(value, AbiType.int32Size);
            return returned;
        }
        throw Error();
    }
    decode(encoded, offset = 0) {
        let l = Buffer.alloc(AbiType.int32Size);
        bytes_1.BytesUtils.arraycopy(encoded, offset, l, 0, this.getFixedSize());
        return hash_1.Hash.digest(l);
    }
}
