/// <reference types="node" />
declare class Address {
    static prefix: string;
    static addressLength: number;
    static userByte: number;
    static contractByte: number;
    static coreSize: number;
    hrp: string;
    core: Buffer;
    constructor(hrp: string, core: Buffer);
    static parse(address: string): Address;
    toString(): string;
    static fromPublicKey(publicKey: Buffer): Address;
    getBytes(): Buffer;
    static isAddress(value: any): boolean;
}
export declare const emptyAddress: Address;
export declare const plasmaAddress: Address;
export declare const pillarAddress: Address;
export declare const tokenAddress: Address;
export declare const sentinelAddress: Address;
export declare const swapAddress: Address;
export declare const stakeAddress: Address;
export declare const sporkAddress: Address;
export declare const acceleratorAddress: Address;
export declare const bridgeAddress: Address;
export { Address };
