/// <reference types="node" />
import { Address } from "../primitives/address";
import { Hash } from "../primitives/hash";
import { HashHeight } from "../primitives/hash_height";
import { TokenStandard } from "../primitives/token_standard";
import { AccountBlockTemplate } from "./account_block_template";
import { Token } from "./token";
import BigNumber from "bignumber.js";
export declare class AccountBlockConfirmationDetail {
    numConfirmations: number;
    momentumHeight: number;
    momentumHash: Hash;
    momentumTimestamp: number;
    constructor(numConfirmations: number, momentumHeight: number, momentumHash: Hash, momentumTimestamp: number);
    static fromJson(json: {
        [key: string]: any;
    }): AccountBlockConfirmationDetail;
    static toJson(accountBlockConfirmationDetail: AccountBlockConfirmationDetail): {
        [key: string]: any;
    };
}
export declare class AccountBlock extends AccountBlockTemplate {
    descendantBlocks: Array<AccountBlock>;
    basePlasma: number;
    usedPlasma: number;
    changesHash: Hash;
    token?: Token;
    confirmationDetail?: AccountBlockConfirmationDetail;
    pairedAccountBlock?: AccountBlock;
    constructor(version: number, chainIdentifier: number, blockType: number, hash: Hash, previousHash: Hash, height: number, momentumAcknowledged: HashHeight, address: Address, toAddress: Address, amount: BigNumber, tokenStandard: TokenStandard, fromBlockHash: Hash, data: Buffer, fusedPlasma: number, difficulty: number, nonce: string, publicKey: Buffer, signature: Buffer, token?: Token, descendantBlocks?: Array<AccountBlock>, basePlasma?: number, usedPlasma?: number, changesHash?: Hash, confirmationDetail?: AccountBlockConfirmationDetail, pairedAccountBlock?: AccountBlock);
    static fromJson(json: {
        [key: string]: any;
    }): AccountBlock;
    toJson(): {
        [key: string]: any;
    };
    isCompleted(): boolean;
}
export declare class AccountBlockList {
    count?: number;
    list?: Array<AccountBlock>;
    more?: boolean;
    constructor(count?: number, list?: Array<AccountBlock>, more?: boolean);
    static fromJson(json: {
        [key: string]: any;
    }): AccountBlockList;
    toJson(): {
        [key: string]: any;
    };
}
