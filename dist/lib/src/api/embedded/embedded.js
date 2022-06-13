"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedApi = void 0;
const pillar_1 = require("./pillar");
const plasma_1 = require("./plasma");
const sentinel_1 = require("./sentinel");
const stake_1 = require("./stake");
const token_1 = require("./token");
class EmbeddedApi {
    // ToDo implement swap, accelerator
    // swap: SwapApi;
    // accelerator: AcceleratorApi;
    constructor() {
        this.pillar = new pillar_1.PillarApi();
        this.plasma = new plasma_1.PlasmaApi();
        this.sentinel = new sentinel_1.SentinelApi();
        this.stake = new stake_1.StakeApi();
        this.token = new token_1.TokenApi();
    }
    setClient(client) {
        this.client = client;
        this.pillar.setClient(client);
        this.plasma.setClient(client);
        this.sentinel.setClient(client);
        this.stake.setClient(client);
        this.token.setClient(client);
    }
}
exports.EmbeddedApi = EmbeddedApi;
