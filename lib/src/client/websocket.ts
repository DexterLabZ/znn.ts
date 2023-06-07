import {logger} from "ethers";
import {noConnectionException} from "./exceptions";
import {Client} from "./interfaces";
import {Zenon} from "../zenon";

let WebSocket = require("rpc-websockets").Client;

enum WebsocketStatus {
  uninitialized,
  connecting,
  running,
  stopped,
}

type WSSubscriptionCallback = (data: any[]) => void;

class WSSubscriptions {
  callbacks: Map<string, WSSubscriptionCallback>;

  constructor() {
    this.callbacks = new Map<string, WSSubscriptionCallback>();
  }

  setCallback(id: string, callback: WSSubscriptionCallback) {
    this.callbacks.set(id, callback);
  }

  handleGlobalNotification(data: any) {
    const id = data.subscription;
    if (this.callbacks.has(id)) {
      const callback = this.callbacks.get(id);
      if (callback) {
        callback(data.result);
      }
    }
  }

  newUpdateStream(jsonResponse: string) {
    // jsonResponse is just the ID actually
    return new WSUpdateStream(jsonResponse, this);
  }
}

export class WSUpdateStream {
  id: string;
  wsSubscribers: WSSubscriptions;

  constructor(id: string, wsSubscribers: WSSubscriptions) {
    this.id = id;
    this.wsSubscribers = wsSubscribers;
  }

  onNotification(callback: WSSubscriptionCallback) {
    this.wsSubscribers.setCallback(this.id, callback);
  }
}

export class WsClient implements Client {
  _wsRpc2Client?: any;
  _websocketIntendedState: WebsocketStatus = WebsocketStatus.uninitialized;
  url: string;
  subscriptions: WSSubscriptions;

  constructor(url: string) {
    this.url = url;
    this._websocketIntendedState = WebsocketStatus.uninitialized;
    this.subscriptions = new WSSubscriptions();
  }

  initialize(url: string, retry = true, timeout = 30000): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.url = url;
        this._wsRpc2Client = new WebSocket(this.url, retry);

        logger.info(
          `Initializing websocket connection to:${this.url} on chainIdentifier ${Zenon.getChainIdentifier()}`
        );

        this._wsRpc2Client.on("open", function () {
          logger.info("Websocket connection successfully established");
          resolve();
        });

        // register listeners on subscribe events
        this._wsRpc2Client.on(
          "ledger.subscription",
          this.subscriptions.handleGlobalNotification.bind(this.subscriptions)
        );

        await new Promise((resolve) => setTimeout(resolve, timeout));
        reject(`Timeout after ${timeout / 1000} seconds`);
      } catch (err: any) {
        logger.warn(`Error connecting to node. ${err}`);
        reject(err);
      }
    });
  }

  // used to register new subscription handlers after a subscribe call has been made
  newSubscription(id: string): WSUpdateStream {
    return this.subscriptions.newUpdateStream(id);
  }

  status(): WebsocketStatus {
    return this._websocketIntendedState;
  }

  async restart(): Promise<void> {
    if (this._websocketIntendedState != WebsocketStatus.running) {
      return;
    }
    if (this._wsRpc2Client != null && this._wsRpc2Client!.isClosed == true) {
      logger.info("Restarting websocket connection ...");
      await this.initialize(this.url!, true);
      logger.info("Websocket connection successfully restarted");
    }
  }

  stop(): void {
    if (this._websocketIntendedState != WebsocketStatus.running) {
      return;
    }
    this._websocketIntendedState = WebsocketStatus.stopped;
    logger.info("Websocket client is already closed");

    this._wsRpc2Client.close().then(() => {
      logger.info("Websocket client is now closed");
    });
  }

  sendRequest(method: string, parameters?: any): Promise<any> {
    if (!this._wsRpc2Client) {
      throw noConnectionException;
    }
    return this._wsRpc2Client.call(method, parameters);
  }
}
