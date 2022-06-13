"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = exports.Primitives = void 0;
const plasma_1 = require("../embedded/plasma");
const account_block_template_1 = require("../nom/account_block_template");
const address_1 = require("./address");
const hash_1 = require("./hash");
const token_standard_1 = require("./token_standard");
const Primitives = {
    Address: address_1.Address,
    Hash: hash_1.Hash,
    GetRequiredParam: plasma_1.GetRequiredParam,
    AccountBlockTemplate: account_block_template_1.AccountBlockTemplate,
    TokenStandard: token_standard_1.TokenStandard
};
exports.Primitives = Primitives;
const Constants = {
    znnZts: token_standard_1.znnZts
};
exports.Constants = Constants;
