"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noConnectionException = void 0;
const global_1 = require("../global");
exports.noConnectionException = new global_1.ZnnSdkException('No connection to the Zenon full node');
