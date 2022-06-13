import { Client } from "../../client/interfaces";
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
    constructor();
    setClient(client: Client): void;
}
