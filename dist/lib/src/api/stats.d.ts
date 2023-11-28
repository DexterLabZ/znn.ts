import { Client } from "../client/interfaces";
import { ExtraData } from "../model/embedded/stats";
export declare class StatsApi {
    client: Client;
    setClient(client: Client): void;
    getExtraData(): Promise<ExtraData>;
}
