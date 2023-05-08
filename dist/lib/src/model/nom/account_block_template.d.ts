/// <reference types="node" />
import { Address } from "../primitives/address";
import { Hash } from "../primitives/hash";
import { HashHeight } from "../primitives/hash_height";
import { TokenStandard } from "../primitives/token_standard";
import BigNumber from "bignumber.js";
export declare enum BlockTypeEnum {
    unknown = 0,
    genesisReceive = 1,
    userSend = 2,
    userReceive = 3,
    contractSend = 4,
    contractReceive = 5
}
export declare class AccountBlockTemplate {
    version: number;
    chainIdentifier: number;
    blockType: number;
    hash: Hash;
    previousHash: Hash;
    height: number;
    momentumAcknowledged: HashHeight;
    address: Address;
    toAddress: Address;
    amount: number | string | BigNumber;
    tokenStandard: TokenStandard;
    fromBlockHash: Hash;
    data: Buffer;
    fusedPlasma: number;
    difficulty: number;
    nonce: string;
    publicKey: Buffer;
    signature: Buffer;
    constructor(version: number | undefined, chainIdentifier: number | undefined, blockType: number, hash?: Hash, previousHash?: Hash, height?: number, momentumAcknowledged?: HashHeight, address?: Address, toAddress?: Address, amount?: number | string | BigNumber, tokenStandard?: TokenStandard, fromBlockHash?: Hash, data?: Buffer, fusedPlasma?: number, difficulty?: number, nonce?: string, publicKey?: Buffer, signature?: Buffer);
    static fromJson(json: {
        [key: string]: any;
    }): AccountBlockTemplate;
    toJson(): {
        [key: string]: any;
    };
    static receive(fromBlockHash: Hash): AccountBlockTemplate;
    static send(toAddress: Address, tokenStandard: TokenStandard, amount: number | string | BigNumber): AccountBlockTemplate;
    static callContract(address: Address, tokenStandard: TokenStandard, amount: number | string | BigNumber, data: Buffer): AccountBlockTemplate;
    toString(): string;
}
