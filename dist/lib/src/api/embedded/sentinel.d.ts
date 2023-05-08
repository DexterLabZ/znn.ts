import { Client } from "../../client/interfaces";
import { RewardHistoryList } from "../../model/embedded/common";
import { SentinelInfoList } from "../../model/embedded/sentinel";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Address } from "../../model/primitives/address";
import BigNumber from "bignumber.js";
export declare class SentinelApi {
    client: Client;
    setClient(client: Client): void;
    getAllActive(pageIndex?: number, pageSize?: number): Promise<SentinelInfoList>;
    getByOwner(owner: Address): Promise<SentinelInfoList>;
    getDepositedQsr(address: Address): Promise<number>;
    getUncollectedReward(address: Address): Promise<number>;
    getFrontierRewardByPage(address: Address, pageIndex?: number, pageSize?: number): Promise<RewardHistoryList>;
    register(): Promise<AccountBlockTemplate>;
    revoke(): Promise<AccountBlockTemplate>;
    collectRewards(): Promise<AccountBlockTemplate>;
    depositQsr(amount: BigNumber): Promise<AccountBlockTemplate>;
    withdrawQsr(): Promise<AccountBlockTemplate>;
}
