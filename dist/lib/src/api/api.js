"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const ledger_1 = require("./ledger");
const pillar_1 = require("./embedded/pillar");
const plasma_1 = require("./embedded/plasma");
exports.Api = {
    LedgerApi: ledger_1.LedgerApi,
    PillarApi: pillar_1.PillarApi,
    PlasmaApi: plasma_1.PlasmaApi
};
