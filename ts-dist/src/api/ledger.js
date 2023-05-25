"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerApi = void 0;
const account_block_1 = require("../model/nom/account_block");
const account_info_1 = require("../model/nom/account_info");
const detailed_momentum_1 = require("../model/nom/detailed_momentum");
const momentum_1 = require("../model/nom/momentum");
const constants_1 = require("./../client/constants");
// import { BigNumber } from "ethers";
// var JSONbig = require("json-bigint")({useNativeBigInt: true});
class LedgerApi {
    setClient(client) {
        this.client = client;
    }
    publishRawTransaction(accountBlockTemplate) {
        // console.log("accountBlockTemplate", accountBlockTemplate);
        const jsonedAccountBlockTemplate = accountBlockTemplate.toJson();
        // console.log("jsonedAccountBlockTemplate", jsonedAccountBlockTemplate);
        // jsonedAccountBlockTemplate.amount = BytesUtils.numberOrStringToBytes(accountBlockTemplate.amount.toString()).toJSON().data;
        // console.log("jsonedAccountBlockTemplate 2", jsonedAccountBlockTemplate);
        // jsonedAccountBlockTemplate.amount = ethers.BigNumber.from(accountBlockTemplate.amount.toString());
        // jsonedAccountBlockTemplate.amount = accountBlockTemplate.amount.toString();
        //
        // ToDo: Also replace these where necessary
        //
        //
        // Token:
        //
        // jsonedAccountBlockTemplate.totalSupply = accountBlockTemplate.totalSupply.toString();
        // jsonedAccountBlockTemplate.maxSupply = accountBlockTemplate.maxSupply.toString();
        // BalanceInfoItem
        //
        // balance
        // AccountBlock
        //
        // usedPlasma
        // basePlasma
        // Under embedded
        //
        // Swap
        //
        // qsr
        // znn
        // StakeList
        //
        // totalAmount
        // totalWeightedAmount
        // Plasma
        //
        // qsrAmount
        // Pillar
        //
        // weight
        // common
        //
        // znnAmount
        // qsrAmount
        // Accelerator
        //
        // znnFundsNeeded
        // qsrFundsNeeded
        // jsonedAccountBlockTemplate.difficulty = parseInt(accountBlockTemplate.difficulty.toString());
        // jsonedAccountBlockTemplate.difficulty = accountBlockTemplate.difficulty.toString();
        console.log("jsonedAccountBlockTemplate 3", jsonedAccountBlockTemplate);
        // console.log("JSONbig.stringify(jsonedAccountBlockTemplate)", JSONbig.stringify(jsonedAccountBlockTemplate));
        return this.client.sendRequest("ledger.publishRawTransaction", [jsonedAccountBlockTemplate]);
    }
    async getUnconfirmedBlocksByAddress(address, pageIndex = 0, pageSize = constants_1.memoryPoolPageSize) {
        let response = await this.client.sendRequest("ledger.getUnconfirmedBlocksByAddress", [
            address.toString(),
            pageIndex,
            pageSize,
        ]);
        return account_block_1.AccountBlockList.fromJson(response);
    }
    async getUnreceivedBlocksByAddress(address, pageIndex = 0, pageSize = constants_1.memoryPoolPageSize) {
        let response = await this.client.sendRequest("ledger.getUnreceivedBlocksByAddress", [
            address.toString(),
            pageIndex,
            pageSize,
        ]);
        return account_block_1.AccountBlockList.fromJson(response);
    }
    //
    // Account-blocks
    //
    async getFrontierBlock(address) {
        let response = await this.client.sendRequest("ledger.getFrontierAccountBlock", [address?.toString()]);
        return response == null ? null : account_block_1.AccountBlock.fromJson(response);
    }
    async getBlockByHash(hash) {
        let response = await this.client.sendRequest("ledger.getAccountBlockByHash", [hash?.toString()]);
        return response == null ? null : account_block_1.AccountBlock.fromJson(response);
    }
    async getBlocksByHeight(address, height = 1, count = constants_1.rpcMaxPageSize) {
        let response = await this.client.sendRequest("ledger.getAccountBlocksByHeight", [
            address.toString(),
            height,
            count,
        ]);
        return account_block_1.AccountBlockList.fromJson(response);
    }
    async getBlocksByPage(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        let response = await this.client.sendRequest("ledger.getAccountBlocksByPage", [
            address.toString(),
            pageIndex,
            pageSize,
        ]);
        return account_block_1.AccountBlockList.fromJson(response);
    }
    //
    // Momentums
    //
    async getFrontierMomentum() {
        let response = await this.client.sendRequest("ledger.getFrontierMomentum", []);
        return momentum_1.Momentum.fromJson(response);
    }
    async getMomentumBeforeTime(time) {
        let response = await this.client.sendRequest("ledger.getMomentumBeforeTime", [time]);
        return response == null ? null : momentum_1.Momentum.fromJson(response);
    }
    async getMomentumByHash(hash) {
        let response = await this.client.sendRequest("ledger.getMomentumByHash", [hash.toString()]);
        return response == null ? null : momentum_1.Momentum.fromJson(response);
    }
    async getMomentumsByHeight(height, count) {
        height = height < 1 ? 1 : height;
        count = count > constants_1.rpcMaxPageSize ? constants_1.rpcMaxPageSize : count;
        let response = await this.client.sendRequest("ledger.getMomentumsByHeight", [height, count]);
        return momentum_1.MomentumList.fromJson(response);
    }
    // pageIndex = 0 returns the most recent momentums sorted descending by height
    async getMomentumsByPage(pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        let response = await this.client.sendRequest("ledger.getMomentumsByPage", [pageIndex, pageSize]);
        return momentum_1.MomentumList.fromJson(response);
    }
    async getDetailedMomentumsByHeight(height, count) {
        height = height < 1 ? 1 : height;
        count = count > constants_1.rpcMaxPageSize ? constants_1.rpcMaxPageSize : count;
        let response = await this.client.sendRequest("ledger.getDetailedMomentumsByHeight", [height, count]);
        return detailed_momentum_1.DetailedMomentumList.fromJson(response);
    }
    //
    // Account info
    //
    async getAccountInfoByAddress(address) {
        let response = await this.client.sendRequest("ledger.getAccountInfoByAddress", [address.toString()]);
        // console.log("response getAccountInfoByAddress", response);
        return account_info_1.AccountInfo.fromJson(response);
    }
}
exports.LedgerApi = LedgerApi;
