/// <reference types="node" />
declare class TokenStandard {
    static prefix: string;
    static coreSize: number;
    core: Buffer;
    constructor(core: Buffer);
    toString(): string;
    static parse(str: string): TokenStandard;
    getBytes(): Buffer;
    static isTokenStandard(value: any): boolean;
}
declare const znnTokenStandard: string;
declare const qsrTokenStandard: string;
declare const emptyTokenStandard: string;
declare const znnZts: TokenStandard;
declare const qsrZts: TokenStandard;
declare const emptyZts: TokenStandard;
export { TokenStandard, znnTokenStandard, qsrTokenStandard, emptyTokenStandard, znnZts, qsrZts, emptyZts };
