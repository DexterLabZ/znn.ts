"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.netId = exports.Zenon = exports.Api = void 0;
__exportStar(require("./wallet/wallet"), exports);
var api_1 = require("./api/api");
Object.defineProperty(exports, "Api", { enumerable: true, get: function () { return api_1.Api; } });
var zenon_1 = require("./zenon");
Object.defineProperty(exports, "Zenon", { enumerable: true, get: function () { return zenon_1.Zenon; } });
var global_1 = require("./global");
Object.defineProperty(exports, "netId", { enumerable: true, get: function () { return global_1.netId; } });
const block_1 = require("./utils/block");
const utils = {
    BlockUtils: block_1.BlockUtils,
};
exports.utils = utils;
__exportStar(require("./exports"), exports);
