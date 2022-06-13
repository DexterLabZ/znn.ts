"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsClient = exports.WSUpdateStream = void 0;
const ethers_1 = require("ethers");
const global_1 = require("../global");
const exceptions_1 = require("./exceptions");
let WebSocket = require('rpc-websockets').Client;
var WebsocketStatus;
(function (WebsocketStatus) {
    WebsocketStatus[WebsocketStatus["uninitialized"] = 0] = "uninitialized";
    WebsocketStatus[WebsocketStatus["connecting"] = 1] = "connecting";
    WebsocketStatus[WebsocketStatus["running"] = 2] = "running";
    WebsocketStatus[WebsocketStatus["stopped"] = 3] = "stopped";
})(WebsocketStatus || (WebsocketStatus = {}));
class WSSubscriptions {
    constructor() {
        this.callbacks = new Map();
    }
    setCallback(id, callback) {
        this.callbacks.set(id, callback);
    }
    handleGlobalNotification(data) {
        const id = data.subscription;
        if (this.callbacks.has(id)) {
            const callback = this.callbacks.get(id);
            if (callback) {
                callback(data.result);
            }
        }
    }
    newUpdateStream(jsonResponse) {
        // jsonResponse is just the ID actually
        return new WSUpdateStream(jsonResponse, this);
    }
}
class WSUpdateStream {
    constructor(id, wsSubscribers) {
        this.id = id;
        this.wsSubscribers = wsSubscribers;
    }
    onNotification(callback) {
        this.wsSubscribers.setCallback(this.id, callback);
    }
}
exports.WSUpdateStream = WSUpdateStream;
class WsClient {
    constructor(url) {
        this._websocketIntendedState = WebsocketStatus.uninitialized;
        this.url = url;
        this._websocketIntendedState = WebsocketStatus.uninitialized;
        this.subscriptions = new WSSubscriptions();
    }
    initialize(url, retry = true, timeout = 30000) {
        return new Promise(async (resolve, reject) => {
            this.url = url;
            this._wsRpc2Client = new WebSocket(this.url, retry);
            // TODO: This can be misinterpreted, as the chainIdentifier of the SDK is {netId}. It does not mean that the {netId} of the node is the same.
            ethers_1.logger.info(`Initializing websocket connection to:${this.url} on chainIdentifier ${global_1.netId}`);
            this._wsRpc2Client.on('open', function () {
                ethers_1.logger.info('Websocket connection successfully established');
                resolve();
            });
            // register listeners on subscribe events
            this._wsRpc2Client.on('ledger.subscription', this.subscriptions.handleGlobalNotification.bind(this.subscriptions));
            await new Promise((resolve) => setTimeout(resolve, timeout));
            reject(`Timeout after ${timeout / 1000} seconds`);
        });
    }
    // used to register new subscription handlers after a subscribe call has been made
    newSubscription(id) {
        return this.subscriptions.newUpdateStream(id);
    }
    status() {
        return this._websocketIntendedState;
    }
    async restart() {
        if (this._websocketIntendedState != WebsocketStatus.running) {
            return;
        }
        if (this._wsRpc2Client != null && this._wsRpc2Client.isClosed == true) {
            ethers_1.logger.info('Restarting websocket connection ...');
            await this.initialize(this.url, true);
            ethers_1.logger.info('Websocket connection successfully restarted');
        }
    }
    stop() {
        if (this._websocketIntendedState != WebsocketStatus.running) {
            return;
        }
        this._websocketIntendedState = WebsocketStatus.stopped;
        ethers_1.logger.info('Websocket client is already closed');
        this._wsRpc2Client.close().then(() => {
            ethers_1.logger.info('Websocket client is now closed');
        });
    }
    sendRequest(method, parameters) {
        if (!this._wsRpc2Client) {
            throw exceptions_1.noConnectionException;
        }
        return this._wsRpc2Client.call(method, parameters);
    }
}
exports.WsClient = WsClient;
