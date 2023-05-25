import {rpcMaxPageSize} from "../../client/constants";
import {Client} from "../../client/interfaces";
import {Definitions} from "../../embedded/definitions";
import {FusionEntryList, GetRequiredParam, GetRequiredResponse, PlasmaInfo} from "../../model/embedded/plasma";
import {AccountBlockTemplate} from "../../model/nom/account_block_template";
import {Address, plasmaAddress} from "../../model/primitives/address";
import {Hash} from "../../model/primitives/hash";
import {qsrZts} from "../../model/primitives/token_standard";
import {BigNumber, ethers} from "ethers";

export class PlasmaApi {
  client!: Client;

  setClient(client: Client) {
    this.client = client;
  }

  //
  // RPC
  //
  async get(address: Address): Promise<PlasmaInfo> {
    const response = await this.client.sendRequest("embedded.plasma.get", [address.toString()]);
    // ToDo: Add response validation
    return PlasmaInfo.fromJson(response!);
  }

  async getEntriesByAddress(address: Address, pageIndex = 0, pageSize = rpcMaxPageSize): Promise<FusionEntryList> {
    // ToDo: Add response validation
    const response = await this.client.sendRequest("embedded.plasma.getEntriesByAddress", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    return FusionEntryList.fromJson(response!);
  }

  async getRequiredFusionAmount(requiredPlasma: BigNumber): Promise<BigNumber> {
    const response = await this.client.sendRequest("embedded.plasma.getRequiredFusionAmount", [requiredPlasma]);
    // ToDo: This does not work!
    // {code: -32601, message: 'the method embedded.plasma.getRequiredFusionAmount does not exist/is not available'}
    return response;
  }

  getPlasmaByQsr(qsrAmount: BigNumber): BigNumber {
    return ethers.BigNumber.from(qsrAmount.toString()).mul(2100);
  }

  async getRequiredPoWForAccountBlock(powParam: GetRequiredParam): Promise<GetRequiredResponse> {
    const response = await this.client.sendRequest("embedded.plasma.getRequiredPoWForAccountBlock", [
      powParam.toJson(),
    ]);
    // ToDo: Add response validation
    return GetRequiredResponse.fromJson(response);
  }

  //
  // Contract methods
  //
  async fuse(beneficiary: Address, amount: BigNumber) {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      plasmaAddress,
      qsrZts,
      amount,
      Definitions.plasma.encodeFunction("Fuse", [beneficiary.toString()])
    );
  }

  async cancel(id: Hash) {
    // ToDo: Add response validation
    return AccountBlockTemplate.callContract(
      plasmaAddress,
      qsrZts,
      ethers.BigNumber.from("0"),
      Definitions.plasma.encodeFunction("CancelFuse", [id.getBytes()])
    );
  }
}
