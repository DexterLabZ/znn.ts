import {WsClient, WSUpdateStream} from "../client";
import {Address} from "../model/primitives/address";

export class SubscribeApi {
  client!: WsClient;

  setClient(client: WsClient) {
    this.client = client;
  }

  async subscribeTo(params: any): Promise<WSUpdateStream> {
    const response = await this.client.sendRequest("ledger.subscribe", params);
    return this.client.newSubscription(response)
  }

  toMomentums(): Promise<WSUpdateStream> {
    return this.subscribeTo(['momentums'])
  }

  toAllAccountBlocks(): Promise<WSUpdateStream> {
    return this.subscribeTo(['allAccountBlocks'])
  };

  toAccountBlocksByAddress(address: Address): Promise<WSUpdateStream> {
    return this.subscribeTo(['accountBlocksByAddress', address.toString()])
  };

  toUnreceivedAccountBlocksByAddress(address: Address): Promise<WSUpdateStream> {
    return this.subscribeTo(['unreceivedAccountBlocksByAddress', address.toString()])
  };
}
