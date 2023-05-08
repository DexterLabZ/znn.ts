import BigNumber from "bignumber.js";
import {rpcMaxPageSize} from "../../client/constants";
import {Client} from "../../client/interfaces";
import {Definitions} from "../../embedded/definitions";
import {RewardHistoryList, UncollectedReward} from "../../model/embedded/common";
import {LiquidityInfo, LiquidityStakeList} from "../../model/embedded/liquidity";
import {StakeList} from "../../model/embedded/stake";
import {AccountBlockTemplate} from "../../model/nom/account_block_template";
import {Address, liquidityAddress, stakeAddress} from "../../model/primitives/address";
import {Hash} from "../../model/primitives/hash";
import {TokenStandard, znnZts} from "../../model/primitives/token_standard";

export class LiquidityApi {
  client!: Client;

  setClient(client: Client) {
    this.client = client;
  }

  //
  // RPC
  //
  async getLiquidityInfo(): Promise<LiquidityInfo> {
    const response = await this.client.sendRequest("embedded.liquidity.getLiquidityInfo", []);
    // ToDo: Add response validation
    return LiquidityInfo.fromJson(response!);
  }

  async getLiquidityStakeEntriesByAddress(
    address: Address,
    pageIndex = 0,
    pageSize = rpcMaxPageSize
  ): Promise<LiquidityStakeList> {
    const response = await this.client.sendRequest("embedded.liquidity.getLiquidityStakeEntriesByAddress", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    // ToDo: Add response validation
    return LiquidityStakeList.fromJson(response!);
  }

  async getUncollectedReward(address: Address): Promise<UncollectedReward> {
    const response = await this.client.sendRequest("embedded.liquidity.getUncollectedReward", [address.toString()]);
    // ToDo: Add response validation
    return UncollectedReward.fromJson(response!);
  }

  async getFrontierRewardByPage(
    address: Address,
    pageIndex = 0,
    pageSize = rpcMaxPageSize
  ): Promise<RewardHistoryList> {
    const response = await this.client.sendRequest("embedded.liquidity.getFrontierRewardByPage", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    // ToDo: Add response validation
    return RewardHistoryList.fromJson(response!);
  }

  // Contract methods
  liquidityStake(durationInSec: number, zts: TokenStandard, amount: number | string | BigNumber): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      liquidityAddress,
      zts,
      amount.toString(),
      Definitions.liquidity.encodeFunction("LiquidityStake", [durationInSec])
    );
  }

  cancelLiquidityStake(id: Hash): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      liquidityAddress,
      znnZts,
      0,
      Definitions.liquidity.encodeFunction("CancelLiquidityStake", [id.getBytes()])
    );
  }

  // Common contract methods
  collectReward(): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      liquidityAddress,
      znnZts,
      0,
      Definitions.common.encodeFunction("CollectReward", [])
    );
  }
}
