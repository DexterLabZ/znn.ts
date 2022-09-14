import { rpcMaxPageSize } from "../../client/constants";
import { Client } from "../../client/interfaces";
import { Definitions } from "../../embedded/definitions";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { bridgeAddress } from "../../model/primitives/address";
import { Hash } from "../../model/primitives/hash";
import { TokenStandard } from "../../model/primitives/token_standard";

export class BridgeApi{
  client!: Client;

  setClient(client: Client){
    this.client = client;
  }

  // 
  // RPC
  // 
  async getBridgeInfo(): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getBridgeInfo', []);
    // console.log("getBridgeInfo", response);
    return response;
  }

  async getNetworkInfo(networkType: number, chainId: number): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getNetworkInfo', [networkType, chainId]);
    // console.log("getNetworkInfo", response);
    return response;
  } 
  
  async getWrapTokenRequestById(hashID: Hash): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getWrapTokenRequestById', [hashID.toString()]);
    // console.log("GetWrapTokenRequestById", response);
    return response;
  } 
  
  async getAllWrapTokenRequestsByToAddress(address: string, pageIndex = 0, pageSize = rpcMaxPageSize): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getAllWrapTokenRequestsByToAddress', [address, pageIndex, pageSize]);
    // console.log("GetWrapTokenRequestById", response);
    return response;
  } 

  async getAllWrapTokenRequests(pageIndex = 0, pageSize = rpcMaxPageSize): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getAllWrapTokenRequests', [pageIndex, pageSize]);
    // console.log("getAllWrapTokenRequests", response);
    return response;
  } 

  async getAllUnsignedWrapTokenRequests(pageIndex = 0, pageSize = rpcMaxPageSize): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getAllUnsignedWrapTokenRequests', [pageIndex, pageSize]);
    // console.log("getAllUnsignedWrapTokenRequests", response);
    return response;
  } 

  async getUnwrapTokenRequestById(hashID: Hash): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getUnwrapTokenRequestById', [hashID.toString()]);
    // console.log("getUnwrapTokenRequestById", response);
    return response;
  } 
  
  async getAllUnwrapTokenRequestsByToAddress(address: string, pageIndex = 0, pageSize = rpcMaxPageSize): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getAllUnwrapTokenRequestsByToAddress', [address, pageIndex, pageSize]);
    // console.log("getAllUnwrapTokenRequestsByToAddress", response);
    return response;
  } 

  async getAllUnwrapTokenRequests(pageIndex = 0, pageSize = rpcMaxPageSize): Promise<any>{
    const response = await this.client.sendRequest('embedded.bridge.getAllUnwrapTokenRequests', [pageIndex, pageSize]);
    // console.log("getAllUnwrapTokenRequests", response);
    return response;
  } 

  // 
  // Contract methods
  // 
  wrapToken(
    networkType: number, 
    chainId: number, 
    toAddress: string,
    amount: number,
    tokenStandard: TokenStandard
    ):AccountBlockTemplate{
    return AccountBlockTemplate.callContract(
      bridgeAddress, 
      tokenStandard,
      amount,
      Definitions.bridge.encodeFunction("WrapToken", [
        networkType,
        chainId,
        toAddress
      ])
    )
  }

  redeem(
    transactionHash: Hash, 
    tokenStandard: TokenStandard
    ):AccountBlockTemplate{
    return AccountBlockTemplate.callContract(
      bridgeAddress, 
      tokenStandard,
      0,
      Definitions.bridge.encodeFunction("Redeem", [
        transactionHash.toString()
      ])
    )
  }
}