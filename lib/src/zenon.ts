import {KeyPair} from "./wallet/keypair";
import {LedgerApi} from "./api/ledger";
import {Client, WsClient} from "./client";
import {AccountBlockTemplate} from "./model/nom/account_block_template";
import {BlockUtils} from "./utils/block";
import {EmbeddedApi} from "./api/embedded/embedded";
import {SubscribeApi} from "./api/subscribe";

export class Zenon {
  static _singleton: Zenon;
  defaultServerUrl: string = "ws://127.0.0.1:35998";

  wsClient?: WsClient;

  ledger: LedgerApi;
  subscribe: SubscribeApi;
  embedded: EmbeddedApi;

  public static getSingleton(): Zenon {
    if (!Zenon._singleton) {
      Zenon._singleton = new Zenon();
    }
    return Zenon._singleton;
  }

  private constructor() {
    this.ledger = new LedgerApi();
    this.embedded = new EmbeddedApi();
    this.subscribe = new SubscribeApi();
  }

  private setClient(client: Client) {
    this.ledger.setClient(client);
    this.embedded.setClient(client);

    // set client for subscribe environment only when the client is a WS Connection
    if (client instanceof WsClient) {
      this.subscribe.setClient(client);
    }
  }

  async initialize(serverUrl = this.defaultServerUrl, retry = true, timeout = 30000) {
    this.wsClient = new WsClient(serverUrl);
    await this.wsClient.initialize(serverUrl, retry, timeout);
    this.setClient(this.wsClient!);
  }

  public clearSocketConnection() {
    this.wsClient?.stop();
    this.wsClient = undefined;
  }

  async send(transaction: AccountBlockTemplate,
             currentKeyPair?: KeyPair,
             generatingPowCallback?: Function,
             waitForRequiredPlasma = false): Promise<AccountBlockTemplate> {
    if (currentKeyPair == null) throw "noKeyPairSelectedException";
    return BlockUtils.send(Zenon.getSingleton(), transaction, currentKeyPair, generatingPowCallback, waitForRequiredPlasma);
  }
}
