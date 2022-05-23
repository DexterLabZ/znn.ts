import { logger } from "ethers";
import { netId } from "../global";
import {noConnectionException} from "./exceptions"
import { Client } from "./interfaces";

let WebSocket = require('rpc-websockets').Client;
enum WebsocketStatus { uninitialized, connecting, running, stopped }
export class WsClient implements Client{
  _wsRpc2Client?: any;
  _websocketIntendedState: WebsocketStatus = WebsocketStatus.uninitialized;
  url?: string;

  constructor(){}

  initialize(url: string, retry = true, timeout = 30000){
    return new Promise<void>(async (resolve, reject)=>{
      this.url = url;
      this._wsRpc2Client = new WebSocket(url, retry);
      logger.info("Initializing websocket connection to:", url, "on chainIdentifier", netId);

      this._wsRpc2Client.on('open', function() {
        logger.info('Websocket connection successfully established');
        resolve();
      });

      await new Promise((resolve, reject) => setTimeout(resolve, timeout));
        reject(`Timeout after ${timeout/1000} seconds `);
    })
  }

  status(){
    return this._websocketIntendedState;
  }

  async restart() {
    if (this._websocketIntendedState != WebsocketStatus.running) {
      return;
    }
    if (this._wsRpc2Client != null && this._wsRpc2Client!.isClosed == true) {
      logger.info('Restarting websocket connection ...');
      await this.initialize(this.url!, true);
      logger.info('Websocket connection successfully restarted');
    }
  }

  stop(): void{
    if (this._websocketIntendedState != WebsocketStatus.running) {
      return;
    }
    this._websocketIntendedState = WebsocketStatus.stopped;
    logger.info('Websocket client is already closed');

    this._wsRpc2Client.close().then(()=>{
      logger.info('Websocket client is now closed');
    });
  }
  
  sendRequest(method: string, parameters?: any): Promise < any > {
    if(!this._wsRpc2Client){
      throw noConnectionException;
    }
    return this._wsRpc2Client.call(method, parameters);
  }

}