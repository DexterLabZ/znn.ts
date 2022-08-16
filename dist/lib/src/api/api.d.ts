import { LedgerApi } from "./ledger";
import { PillarApi } from "./embedded/pillar";
import { PlasmaApi } from "./embedded/plasma";
import { BridgeApi } from "./embedded/bridge";
export declare const Api: {
    LedgerApi: typeof LedgerApi;
    PillarApi: typeof PillarApi;
    PlasmaApi: typeof PlasmaApi;
    BridgeApi: typeof BridgeApi;
};
