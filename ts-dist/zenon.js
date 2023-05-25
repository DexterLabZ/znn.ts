"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zenon = void 0;
const ledger_1 = require("./api/ledger");
const client_1 = require("./client");
const block_1 = require("./utils/block");
const embedded_1 = require("./api/embedded/embedded");
const subscribe_1 = require("./api/subscribe");
class Zenon {
    static getSingleton() {
        if (!Zenon._singleton) {
            Zenon._singleton = new Zenon();
        }
        return Zenon._singleton;
    }
    constructor() {
        this.defaultServerUrl = "ws://127.0.0.1:35998";
        this.ledger = new ledger_1.LedgerApi();
        this.embedded = new embedded_1.EmbeddedApi();
        this.subscribe = new subscribe_1.SubscribeApi();
    }
    setClient(client) {
        this.ledger.setClient(client);
        this.embedded.setClient(client);
        // set client for subscribe environment only when the client is a WS Connection
        if (client instanceof client_1.WsClient) {
            this.subscribe.setClient(client);
        }
    }
    async initialize(serverUrl = this.defaultServerUrl, retry = true, timeout = 30000) {
        this.wsClient = new client_1.WsClient(serverUrl);
        await this.wsClient.initialize(serverUrl, retry, timeout);
        this.setClient(this.wsClient);
    }
    clearSocketConnection() {
        this.wsClient?.stop();
        this.wsClient = undefined;
    }
    async send(transaction, currentKeyPair, generatingPowCallback, waitForRequiredPlasma = false) {
        if (currentKeyPair == null)
            throw "noKeyPairSelectedException";
        return block_1.BlockUtils.send(Zenon.getSingleton(), transaction, currentKeyPair, generatingPowCallback, waitForRequiredPlasma);
    }
}
exports.Zenon = Zenon;
