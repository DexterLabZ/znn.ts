import BigNumber from "bignumber.js";
import { Client } from "../../client/interfaces";
import { RewardHistoryList, UncollectedReward } from "../../model/embedded/common";
import { LiquidityInfo, LiquidityStakeList } from "../../model/embedded/liquidity";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Address } from "../../model/primitives/address";
import { Hash } from "../../model/primitives/hash";
import { TokenStandard } from "../../model/primitives/token_standard";
export declare class LiquidityApi {
    client: Client;
    setClient(client: Client): void;
    getLiquidityInfo(): Promise<LiquidityInfo>;
    getLiquidityStakeEntriesByAddress(address: Address, pageIndex?: number, pageSize?: number): Promise<LiquidityStakeList>;
    getUncollectedReward(address: Address): Promise<UncollectedReward>;
    getFrontierRewardByPage(address: Address, pageIndex?: number, pageSize?: number): Promise<RewardHistoryList>;
    liquidityStake(durationInSec: number, zts: TokenStandard, amount: number | string | BigNumber): AccountBlockTemplate;
    cancelLiquidityStake(id: Hash): AccountBlockTemplate;
    collectReward(): AccountBlockTemplate;
}
