import {rpcMaxPageSize} from "../../client/constants";
import {Client} from "../../client/interfaces";
import {Definitions} from "../../embedded/definitions";
import {RewardHistoryList, UncollectedReward} from "../../model/embedded/common";
import {DelegationInfo, PillarEpochHistoryList, PillarInfo, PillarInfoList} from "../../model/embedded/pillar";
import {AccountBlockTemplate} from "../../model/nom/account_block_template";
import {Address, pillarAddress} from "../../model/primitives/address";
import {znnZts} from "../../model/primitives/token_standard";
import {pillarRegisterZnnAmount} from "./constants";
import BigNumber from "bignumber.js";

export class PillarApi {
  client!: Client;

  setClient(client: Client) {
    this.client = client;
  }

  //
  // Common RPC
  //
  async getDepositedQsr(address: Address): Promise<number | string | BigNumber> {
    return await this.client.sendRequest("embedded.pillar.getDepositedQsr", [address.toString()]);
  }

  async getUncollectedReward(address: Address): Promise<UncollectedReward> {
    const response = await this.client.sendRequest("embedded.pillar.getUncollectedReward", [address.toString()]);
    // ToDo: Add response validation
    // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
    return UncollectedReward.fromJson(response!);
  }

  async getFrontierRewardByPage(
    address: Address,
    pageIndex: number = 0,
    pageSize: number = rpcMaxPageSize
  ): Promise<RewardHistoryList> {
    const response = await this.client.sendRequest("embedded.pillar.getFrontierRewardByPage", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    // ToDo: Add response validation
    // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
    return RewardHistoryList.fromJson(response!);
  }

  //
  // RPC
  //
  async getQsrRegistrationCost(): Promise<number | string | BigNumber> {
    // ToDo: Add response validation
    return await this.client.sendRequest("embedded.pillar.getQsrRegistrationCost", []);
  }

  async getAll(pageIndex: number = 0, pageSize: number = rpcMaxPageSize): Promise<PillarInfoList> {
    const response = await this.client.sendRequest("embedded.pillar.getAll", [pageIndex, pageSize]);
    // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
    return PillarInfoList.fromJson(response!);
  }

  async getByOwner(address: Address): Promise<PillarInfo> {
    const response = await this.client.sendRequest("embedded.pillar.getByOwner", [address.toString()]);
    // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
    return response.map((entry: {[key: string]: any}) => PillarInfo.fromJson(entry));
  }

  async getByName(name: string): Promise<PillarInfo | null> {
    const response = await this.client.sendRequest("embedded.pillar.getByName", [name]);
    return response == null ? null : PillarInfo.fromJson(response);
  }

  async checkNameAvailability(name: string): Promise<PillarInfo> {
    const response = await this.client.sendRequest("embedded.pillar.checkNameAvailability", [name]);
    return response;
  }

  async getDelegatedPillar(address: Address): Promise<DelegationInfo | null> {
    const response = await this.client.sendRequest("embedded.pillar.getDelegatedPillar", [address.toString()]);
    // ToDo: Add response validation. Currently only returns null on many addresses
    return response == null ? null : DelegationInfo.fromJson(response);
  }

  async getPillarsHistoryByEpoch(
    epoch: number,
    pageIndex: number = 0,
    pageSize: number = rpcMaxPageSize
  ): Promise<PillarEpochHistoryList> {
    const response = await this.client.sendRequest("embedded.pillar.getPillarsHistoryByEpoch", [
      epoch,
      pageIndex,
      pageSize,
    ]);
    // ToDo: What happens if we get no response? The dart api forcefully assume that is not the case
    return PillarEpochHistoryList.fromJson(response!);
  }

  //
  // Contract methods
  //

  register(
    // ToDo: Add response validation
    name: string,
    producerAddress: Address,
    rewardAddress: Address,
    giveBlockRewardPercentage: number = 0,
    giveDelegateRewardPercentage: number = 100
  ): AccountBlockTemplate {
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      pillarRegisterZnnAmount,
      Definitions.pillar.encodeFunction("Register", [
        name,
        producerAddress,
        rewardAddress,
        giveBlockRewardPercentage,
        giveDelegateRewardPercentage,
      ])
    );
  }

  registerLegacy(
    // ToDo: Add response validation
    name: string,
    producerAddress: Address,
    rewardAddress: Address,
    publicKey: string,
    signature: string,
    giveBlockRewardPercentage: number = 0,
    giveDelegateRewardPercentage: number = 100
  ): AccountBlockTemplate {
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      pillarRegisterZnnAmount,
      Definitions.pillar.encodeFunction("RegisterLegacy", [
        name,
        producerAddress,
        rewardAddress,
        giveBlockRewardPercentage,
        giveDelegateRewardPercentage,
        publicKey,
        signature,
      ])
    );
  }

  updatePillar(
    // ToDo: Add response validation
    name: string,
    producerAddress: Address,
    rewardAddress: Address,
    giveBlockRewardPercentage: number = 0,
    giveDelegateRewardPercentage: number = 100
  ): AccountBlockTemplate {
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      0,
      Definitions.pillar.encodeFunction("UpdatePillar", [
        name,
        producerAddress,
        rewardAddress,
        giveBlockRewardPercentage,
        giveDelegateRewardPercentage,
      ])
    );
  }

  revoke(name: string): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      0,
      Definitions.pillar.encodeFunction("Revoke", [name])
    );
  }

  delegate(name: string): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      0,
      Definitions.pillar.encodeFunction("Delegate", [name])
    );
  }

  undelegate(): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      0,
      Definitions.pillar.encodeFunction("Undelegate", [])
    );
  }

  // Common contract methods
  collectReward(): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      0,
      Definitions.common.encodeFunction("CollectReward", [])
    );
  }

  depositQsr(amount: number | string | BigNumber): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      amount,
      Definitions.common.encodeFunction("DepositQsr", [])
    );
  }

  withdrawQsr(): AccountBlockTemplate {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      pillarAddress,
      znnZts,
      0,
      Definitions.common.encodeFunction("WithdrawQsr", [])
    );
  }
}
