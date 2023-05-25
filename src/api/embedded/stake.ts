import {rpcMaxPageSize} from "../../client/constants";
import {Client} from "../../client/interfaces";
import {Definitions} from "../../embedded/definitions";
import {RewardHistoryList, UncollectedReward} from "../../model/embedded/common";
import {StakeList} from "../../model/embedded/stake";
import {AccountBlockTemplate} from "../../model/nom/account_block_template";
import {Address, stakeAddress} from "../../model/primitives/address";
import {Hash} from "../../model/primitives/hash";
import {znnZts} from "../../model/primitives/token_standard";
import {BigNumber, ethers} from "ethers";

export class StakeApi {
  client!: Client;

  setClient(client: Client) {
    this.client = client;
  }

  //
  // RPC
  //
  async getEntriesByAddress(address: Address, pageIndex = 0, pageSize = rpcMaxPageSize): Promise<StakeList> {
    const response = await this.client.sendRequest("embedded.stake.getEntriesByAddress", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    // ToDo: Add response validation
    return StakeList.fromJson(response!);
  }

  async getUncollectedReward(address: Address): Promise<UncollectedReward> {
    const response = await this.client.sendRequest("embedded.stake.getUncollectedReward", [address.toString()]);
    // ToDo: Add response validation
    return UncollectedReward.fromJson(response!);
  }

  async getFrontierRewardByPage(
    address: Address,
    pageIndex = 0,
    pageSize = rpcMaxPageSize
  ): Promise<RewardHistoryList> {
    const response = await this.client.sendRequest("embedded.stake.getFrontierRewardByPage", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    // ToDo: Add response validation
    return RewardHistoryList.fromJson(response!);
  }

  // Contract methods
  stake(durationInSec: number, amount: BigNumber): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      stakeAddress,
      znnZts,
      amount,
      Definitions.stake.encodeFunction("Stake", [durationInSec])
    );
  }

  cancel(id: Hash): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      stakeAddress,
      znnZts,
      ethers.BigNumber.from("0"),
      Definitions.stake.encodeFunction("Cancel", [id.getBytes()])
    );
  }

  // Common contract methods
  collectReward(): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      stakeAddress,
      znnZts,
      ethers.BigNumber.from("0"),
      Definitions.common.encodeFunction("CollectReward", [])
    );
  }
}
