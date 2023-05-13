import { Client } from "../../client/interfaces";
import { BridgeApi } from "./bridge";
import { LiquidityApi } from "./liquidity";
import { PillarApi } from "./pillar";
import { PlasmaApi } from "./plasma";
import { SentinelApi } from "./sentinel";
import { StakeApi } from "./stake";
import { TokenApi } from "./token";
export declare class EmbeddedApi {
    client: Client;
    pillar: PillarApi;
    plasma: PlasmaApi;
    sentinel: SentinelApi;
    stake: StakeApi;
    token: TokenApi;
    bridge: BridgeApi;
    liquidity: LiquidityApi;
    constructor();
    setClient(client: Client): void;
}
