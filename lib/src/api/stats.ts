import {Client} from "../client/interfaces";
import {ExtraData} from "../model/embedded/stats";

export class StatsApi {
  client!: Client;

  setClient(client: Client) {
    this.client = client;
  }

  //
  // RPC
  //
  async getExtraData(): Promise<ExtraData> {
    const response = await this.client.sendRequest("stats.extraData", []);
    console.log("getExtraData", response);
    return ExtraData.fromJson(JSON.parse(response || "{}")!);
  }
}
