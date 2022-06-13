/// <reference types="node" />
import { AccountBlockTemplate } from "../model/nom/account_block_template";
import { Hash } from "../model/primitives/hash";
import { KeyPair } from "../wallet/keypair";
import { Zenon } from "../zenon";
export declare class BlockUtils {
    static isSendBlock(blockType?: number): boolean;
    static isReceiveBlock(blockType: number): boolean;
    static getTransactionHash(transaction: AccountBlockTemplate): Promise<Hash>;
    static _getTransactionSignature(keyPair: KeyPair, transaction: AccountBlockTemplate): Promise<Buffer>;
    static _getPoWData(transaction: AccountBlockTemplate): Promise<Hash>;
    static _autofillTransactionParameters(zenonInstance: Zenon, accountBlockTemplate: AccountBlockTemplate): Promise<void>;
    static _checkAndSetFields(zenonInstance: Zenon, transaction: AccountBlockTemplate, currentKeyPair: KeyPair): Promise<boolean>;
    static _setDifficulty(zenonInstance: Zenon, transaction: AccountBlockTemplate, generatingPowCallback?: Function, waitForRequiredPlasma?: boolean): Promise<boolean>;
    static _setHashAndSignature(transaction: AccountBlockTemplate, currentKeyPair: KeyPair): Promise<boolean>;
    static send(zenonInstance: Zenon, transaction: AccountBlockTemplate, currentKeyPair: KeyPair, generatingPowCallback?: Function, waitForRequiredPlasma?: boolean): Promise<AccountBlockTemplate>;
}
