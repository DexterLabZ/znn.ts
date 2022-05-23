import { rpcMaxPageSize } from "../../client/constants";
import { Client } from "../../client/interfaces";
import { Definitions } from "../../embedded/definitions";
import { RewardHistoryList } from "../../model/embedded/common";
import { SentinelInfo, SentinelInfoList } from "../../model/embedded/sentinel";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Address, sentinelAddress } from "../../model/primitives/address";
import { znnZts } from "../../model/primitives/token_standard";
import { sentinelRegisterZnnAmount } from "./constants";

export class SentinelApi{
  client!: Client;

  setClient(client: Client){
    this.client = client;
  }

  // 
  // RPC
  // 
  async getAllActive(pageIndex: number = 0, pageSize: number = rpcMaxPageSize): Promise<SentinelInfoList>{
    const response = await this.client.sendRequest('embedded.sentinel.getAllActive', [pageIndex, pageSize]);
    // ToDo: Add response validation
    return SentinelInfoList.fromJson(response!);
  }

  async getByOwner(owner: Address): Promise<SentinelInfoList>{
    const response = await this.client.sendRequest('embedded.sentinel.getByOwner', [owner.toString()]);
    // ToDo: Add response validation
    return response == null ? response : SentinelInfo.fromJson(response);
  }

  // 
  // Common RPC
  // 
  async getDepositedQsr(address: Address): Promise<number>{
    const response = await this.client.sendRequest('embedded.sentinel.getDepositedQsr', [address.toString()]);
    // ToDo: Add response validation
    return response;
  }

  async getUncollectedReward(address: Address): Promise<number>{
    const response = await this.client.sendRequest('embedded.sentinel.getUncollectedReward', [address.toString()]);
    // ToDo: Add response validation
    return response;
  }

  async getFrontierRewardByPage(address: Address, pageIndex: number = 0, pageSize: number = rpcMaxPageSize): Promise<RewardHistoryList>{
    const response = await this.client.sendRequest('embedded.sentinel.getFrontierRewardByPage', [address.toString(), pageIndex, pageSize]);
    // ToDo: Add response validation
    return RewardHistoryList.fromJson(response);
  }

  // Contract methods
  async register(){
    // ToDo: Add response validation!
    return AccountBlockTemplate.callContract(sentinelAddress, znnZts, sentinelRegisterZnnAmount, Definitions.sentinel.encodeFunction('Register', []));
  }  

  async revoke(){
    // ToDo: Add response validation!
    return AccountBlockTemplate.callContract(sentinelAddress, znnZts, 0, Definitions.sentinel.encodeFunction('Revoke', []));
  }  

  // Common contract methods
  async collectRewards(){
    // ToDo: Add response validation!
    return AccountBlockTemplate.callContract(sentinelAddress, znnZts, 0, Definitions.common.encodeFunction('CollectReward', []));
  }

  async depositQsr(amount: number){
    // ToDo: Add response validation!
    return AccountBlockTemplate.callContract(sentinelAddress, znnZts, amount, Definitions.common.encodeFunction('DepositQsr', []));
  }

  async withdrawQsr(){
    // ToDo: Add response validation!
    return AccountBlockTemplate.callContract(sentinelAddress, znnZts, 0, Definitions.common.encodeFunction('WithdrawQsr', []));
  }
}