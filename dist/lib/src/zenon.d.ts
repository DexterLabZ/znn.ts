import { KeyPair } from "./wallet/keypair";
import { LedgerApi } from "./api/ledger";
import { WsClient } from "./client";
import { AccountBlockTemplate } from "./model/nom/account_block_template";
import { EmbeddedApi } from "./api/embedded/embedded";
import { SubscribeApi } from "./api/subscribe";
export declare class Zenon {
    static _singleton: Zenon;
    defaultServerUrl: string;
    wsClient?: WsClient;
    ledger: LedgerApi;
    subscribe: SubscribeApi;
    embedded: EmbeddedApi;
    static getSingleton(): Zenon;
    private constructor();
    private setClient;
    initialize(serverUrl?: string, retry?: boolean, timeout?: number): Promise<void>;
    clearSocketConnection(): void;
    send(transaction: AccountBlockTemplate, currentKeyPair?: KeyPair, generatingPowCallback?: Function, waitForRequiredPlasma?: boolean): Promise<AccountBlockTemplate>;
    static setChainIdentifier: (chainIdentifier?: number) => void;
    static getChainIdentifier: () => number;
}
