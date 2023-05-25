"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = exports.Constants = exports.Primitives = exports.Enums = void 0;
const pow_1 = require("./pow/pow");
const plasma_1 = require("./model/embedded/plasma");
const account_block_template_1 = require("./model/nom/account_block_template");
const address_1 = require("./model/primitives/address");
const hash_1 = require("./model/primitives/hash");
const token_standard_1 = require("./model/primitives/token_standard");
const liquidity_1 = require("./model/embedded/liquidity");
const account_block_1 = require("./model/nom/account_block");
const account_info_1 = require("./model/nom/account_info");
const Primitives = {
    Address: address_1.Address,
    Hash: hash_1.Hash,
    GetRequiredParam: plasma_1.GetRequiredParam,
    AccountBlock: account_block_1.AccountBlock,
    AccountBlockTemplate: account_block_template_1.AccountBlockTemplate,
    TokenStandard: token_standard_1.TokenStandard,
};
exports.Primitives = Primitives;
const Constants = {
    pillarAddress: address_1.pillarAddress,
    plasmaAddress: address_1.plasmaAddress,
    stakeAddress: address_1.stakeAddress,
    znnTokenStandard: token_standard_1.znnTokenStandard,
    qsrTokenStandard: token_standard_1.qsrTokenStandard,
    emptyTokenStandard: token_standard_1.emptyTokenStandard,
    znnZts: token_standard_1.znnZts,
    qsrZts: token_standard_1.qsrZts,
    emptyZts: token_standard_1.emptyZts,
};
exports.Constants = Constants;
const Enums = {
    PowStatus: pow_1.PowStatus,
};
exports.Enums = Enums;
const Models = {
    AccountInfo: account_info_1.AccountInfo,
    BalanceInfoListItem: account_info_1.BalanceInfoListItem,
    TokenTuple: liquidity_1.TokenTuple,
    LiquidityStakeEntry: liquidity_1.LiquidityStakeEntry,
    LiquidityStakeList: liquidity_1.LiquidityStakeList,
};
exports.Models = Models;
