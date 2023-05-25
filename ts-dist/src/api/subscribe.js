"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeApi = void 0;
class SubscribeApi {
    setClient(client) {
        this.client = client;
    }
    async subscribeTo(params) {
        const response = await this.client.sendRequest("ledger.subscribe", params);
        return this.client.newSubscription(response);
    }
    toMomentums() {
        return this.subscribeTo(['momentums']);
    }
    toAllAccountBlocks() {
        return this.subscribeTo(['allAccountBlocks']);
    }
    ;
    toAccountBlocksByAddress(address) {
        return this.subscribeTo(['accountBlocksByAddress', address.toString()]);
    }
    ;
    toUnreceivedAccountBlocksByAddress(address) {
        return this.subscribeTo(['unreceivedAccountBlocksByAddress', address.toString()]);
    }
    ;
}
exports.SubscribeApi = SubscribeApi;
