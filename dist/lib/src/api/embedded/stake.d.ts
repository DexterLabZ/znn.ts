import { Client } from "../../client/interfaces";
import { RewardHistoryList, UncollectedReward } from "../../model/embedded/common";
import { StakeList } from "../../model/embedded/stake";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Address } from "../../model/primitives/address";
import { Hash } from "../../model/primitives/hash";
import BigNumber from "bignumber.js";
export declare class StakeApi {
    client: Client;
    setClient(client: Client): void;
    getEntriesByAddress(address: Address, pageIndex?: number, pageSize?: number): Promise<StakeList>;
    getUncollectedReward(address: Address): Promise<UncollectedReward>;
    getFrontierRewardByPage(address: Address, pageIndex?: number, pageSize?: number): Promise<RewardHistoryList>;
    stake(durationInSec: number, amount: number | string | BigNumber): AccountBlockTemplate;
    cancel(id: Hash): AccountBlockTemplate;
    collectReward(): AccountBlockTemplate;
}
