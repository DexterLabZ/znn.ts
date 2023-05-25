/// <reference types="node" />
export declare abstract class AbiType {
    static int32Size: number;
    name?: string;
    constructor(name: string);
    getName(): string | undefined;
    getCanonicalName(): string | undefined;
    static getType(typeName: string): AbiType;
    abstract encode(value: Object): Buffer;
    abstract decode(encoded: Buffer, offset?: number): Object;
    getFixedSize(): number;
    isDynamicType(): boolean;
    toString(): string;
}
declare abstract class NumericType extends AbiType {
    constructor(name: string);
    encodeInternal(value?: any): bigint;
}
export declare class UnsignedIntType extends NumericType {
    constructor(name: string);
    getCanonicalName(): string | undefined;
    static encodeInt(i: number): Buffer;
    static encodeIntBig(bigInt: bigint): Buffer;
    encode(value: any): Buffer;
    decode(encoded: Buffer, offset?: number): any;
}
export declare class IntType extends NumericType {
    constructor(name: string);
    getCanonicalName(): string | undefined;
    static encodeInt(i: number): Buffer;
    static encodeIntBig(bigInt: bigint): Buffer;
    static decodeInt(encoded: Buffer, offset: number): bigint;
    encode(value: any): Buffer;
    decode(encoded: Buffer, offset?: number): any;
}
export {};
