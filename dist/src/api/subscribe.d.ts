import { WsClient, WSUpdateStream } from "../client";
import { Address } from "../model/primitives/address";
export declare class SubscribeApi {
    client: WsClient;
    setClient(client: WsClient): void;
    subscribeTo(params: any): Promise<WSUpdateStream>;
    toMomentums(): Promise<WSUpdateStream>;
    toAllAccountBlocks(): Promise<WSUpdateStream>;
    toAccountBlocksByAddress(address: Address): Promise<WSUpdateStream>;
    toUnreceivedAccountBlocksByAddress(address: Address): Promise<WSUpdateStream>;
}
