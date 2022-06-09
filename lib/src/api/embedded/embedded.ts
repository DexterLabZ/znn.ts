import { Client } from "../../client/interfaces";
import { PillarApi } from "./pillar";
import { PlasmaApi } from "./plasma";
import { SentinelApi } from "./sentinel";
import { StakeApi } from "./stake";
import { TokenApi } from "./token";

export class EmbeddedApi{
  client!: Client;
  pillar: PillarApi;
  plasma: PlasmaApi;
  sentinel: SentinelApi;
  stake: StakeApi;
  token: TokenApi;
  // ToDo implement swap, accelerator
  // swap: SwapApi;
  // accelerator: AcceleratorApi;

  constructor(){
    this.pillar = new PillarApi();
    this.plasma = new PlasmaApi();
    this.sentinel = new SentinelApi();
    this.stake = new StakeApi();
    this.token = new TokenApi();
  }

  setClient(client: Client): void{
    this.client = client;
    this.pillar.setClient(client);
    this.plasma.setClient(client);
    this.sentinel.setClient(client);
    this.stake.setClient(client);
    this.token.setClient(client);
  }
}