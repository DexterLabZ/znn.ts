import { Client } from "../client/interfaces";
import { AccountBlock, AccountBlockList } from "../model/nom/account_block";
import { AccountBlockTemplate } from "../model/nom/account_block_template";
import { DetailedMomentumList } from "../model/nom/detailed_momentum";
import { Momentum, MomentumList } from "../model/nom/momentum";
import { Address } from "../model/primitives/address";
import { Hash } from "../model/primitives/hash";
export declare class LedgerApi {
    client: Client;
    setClient(client: Client): void;
    publishRawTransaction(accountBlockTemplate: AccountBlockTemplate): Promise<any>;
    getUnconfirmedBlocksByAddress(address: Address, pageIndex?: number, pageSize?: number): Promise<AccountBlockList>;
    getUnreceivedBlocksByAddress(address: Address, pageIndex?: number, pageSize?: number): Promise<AccountBlockList>;
    getFrontierBlock(address?: Address): Promise<AccountBlock | null>;
    getBlockByHash(hash?: Hash): Promise<AccountBlock | null>;
    getBlocksByHeight(address: Address, height?: number, count?: number): Promise<AccountBlockList>;
    getBlocksByPage(address: Address, pageIndex?: number, pageSize?: number): Promise<AccountBlockList>;
    getFrontierMomentum(): Promise<Momentum>;
    getMomentumBeforeTime(time: number): Promise<Momentum | null>;
    getMomentumByHash(hash: Hash): Promise<Momentum | null>;
    getMomentumsByHeight(height: number, count: number): Promise<MomentumList>;
    getMomentumsByPage(pageIndex?: number, pageSize?: number): Promise<MomentumList>;
    getDetailedMomentumsByHeight(height: number, count: number): Promise<DetailedMomentumList>;
    getAccountInfoByAddress(address: Address): Promise<any>;
}
