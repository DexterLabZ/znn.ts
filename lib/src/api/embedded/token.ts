import { rpcMaxPageSize } from "../../client/constants";
import { Client } from "../../client/interfaces";
import { Definitions } from "../../embedded/definitions";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Token, TokenList } from "../../model/nom/token";
import { Address, tokenAddress } from "../../model/primitives/address";
import { TokenStandard, znnZts } from "../../model/primitives/token_standard";
import { tokenZtsIssueFeeInZnn } from "./constants";

export class TokenApi{
  client!: Client;

  setClient(client: Client){
    this.client = client;
  }

  // 
  // RPC
  // 
  async getAll(pageIndex: number = 0, pageSize: number = rpcMaxPageSize): Promise<TokenList>{
    const response = await this.client.sendRequest('embedded.token.getAll', [pageIndex, pageSize]);
    return TokenList.fromJson(response!);
  }
  
  async getByOwner(address: Address, pageIndex: number = 0, pageSize: number = rpcMaxPageSize): Promise<TokenList>{
    const response = await this.client.sendRequest('embedded.token.getByOwner', [address.toString(), pageIndex, pageSize]);
    // ToDo: Add response validation
    return TokenList.fromJson(response);
  }

  async getByZts(tokenStandard: TokenStandard): Promise<Token | null>{
    const response = await this.client.sendRequest('embedded.token.getByZts', [tokenStandard.toString()]);
    console.log("getByZts", response);
    // ToDo: Add response validation
    return response == null ? null : Token.fromJson(response);
  }

  // Contract methods
  async issueToken(
    tokenName: string, 
    tokenSymbol: string,
    tokenDomain: string,
    totalSupply: number,
    maxSupply: number,
    decimals: number,
    mintable: boolean,
    burnable: boolean,
    utility: boolean){
    let encodedFunction = Definitions.token.encodeFunction('IssueToken', [
      tokenName,
      tokenSymbol,
      tokenDomain,
      totalSupply,
      maxSupply,
      decimals,
      mintable,
      burnable,
      utility
    ])
    return AccountBlockTemplate.callContract(tokenAddress, znnZts, tokenZtsIssueFeeInZnn, encodedFunction);
  }  

  async mint(tokenStandard: TokenStandard, amount: number, receiveAddress: Address){
    let encodedFunction = Definitions.token.encodeFunction('Mint', [tokenStandard, amount, receiveAddress])
    return AccountBlockTemplate.callContract(tokenAddress, znnZts, 0, encodedFunction);
  }  

  async burnToken(tokenStandard: TokenStandard, amount: number){
    let encodedFunction = Definitions.token.encodeFunction('Burn', [])
    return AccountBlockTemplate.callContract(tokenAddress, tokenStandard, amount, encodedFunction);
  }  

  async updateToken(tokenStandard: TokenStandard, owner: Address, isMintable: boolean, isBurnable: boolean){
    let encodedFunction = Definitions.token.encodeFunction('UpdateToken', [tokenStandard, owner, isMintable, isBurnable])
    return AccountBlockTemplate.callContract(tokenAddress, znnZts, 0, encodedFunction);
  }  
}