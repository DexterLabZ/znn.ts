import { KeyPair } from "./wallet/keypair";
import { LedgerApi } from "./api/ledger";
import { WsClient } from "./client/websocket";
import { AccountBlockTemplate } from "./model/nom/account_block_template";
import { BlockUtils } from "./utils/block";
import { EmbeddedApi } from "./api/embedded/embedded";

export class Zenon{
  static _singleton: Zenon;
  defaultServerUrl: string = "ws://127.0.0.1:35998";
  
  static wsClient: WsClient;
  ledger: LedgerApi;
  embedded: EmbeddedApi;

 private constructor(){
    Zenon.wsClient = new WsClient();
    this.ledger = new LedgerApi();
    this.embedded = new EmbeddedApi();

    this.ledger.setClient(Zenon.wsClient);
    this.embedded.setClient(Zenon.wsClient);
  }

  async initialize(serverUrl: string, retry = true){
    await Zenon.wsClient.initialize(serverUrl, retry);
  }

  public static clearSocketConnection(){
    if(Zenon._singleton){
      Zenon.wsClient.stop();
    }
  }
  
  public static getSingleton(): Zenon{
    if(!Zenon._singleton){
      Zenon._singleton = new Zenon();
    }
    return Zenon._singleton;
  }

  async send(transaction: AccountBlockTemplate, 
    currentKeyPair?: KeyPair, 
    generatingPowCallback?: Function,
    waitForRequiredPlasma = false): Promise<AccountBlockTemplate>{
    if (currentKeyPair == null || currentKeyPair == undefined) throw "noKeyPairSelectedException";
    return BlockUtils.send(Zenon.getSingleton(), transaction, currentKeyPair, generatingPowCallback, waitForRequiredPlasma);  
  }
}