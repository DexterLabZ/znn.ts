"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeApi = void 0;
const constants_1 = require("../../client/constants");
const definitions_1 = require("../../embedded/definitions");
const account_block_template_1 = require("../../model/nom/account_block_template");
const address_1 = require("../../model/primitives/address");
const ethers_1 = require("ethers");
class BridgeApi {
    setClient(client) {
        this.client = client;
    }
    //
    // RPC
    //
    async getOrchestratorInfo() {
        const response = await this.client.sendRequest("embedded.bridge.getOrchestratorInfo", []);
        // console.log("getOrchestratorInfo", response);
        return response;
    }
    async getBridgeInfo() {
        const response = await this.client.sendRequest("embedded.bridge.getBridgeInfo", []);
        // console.log("getBridgeInfo", response);
        return response;
    }
    async getAllNetworks(pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest("embedded.bridge.getAllNetworks", [pageIndex, pageSize]);
        // console.log("getAllNetworks", response);
        return response;
    }
    async getNetworkInfo(networkClass, chainId) {
        const response = await this.client.sendRequest("embedded.bridge.getNetworkInfo", [networkClass, chainId]);
        // console.log("getNetworkInfo", response);
        return response;
    }
    async getWrapTokenRequestById(hashID) {
        const response = await this.client.sendRequest("embedded.bridge.getWrapTokenRequestById", [hashID.toString()]);
        // console.log("GetWrapTokenRequestById", response);
        return response;
    }
    async getAllWrapTokenRequestsByToAddress(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest("embedded.bridge.getAllWrapTokenRequestsByToAddress", [
            address,
            pageIndex,
            pageSize,
        ]);
        // console.log("GetWrapTokenRequestById", response);
        return response;
    }
    async getAllWrapTokenRequests(pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest("embedded.bridge.getAllWrapTokenRequests", [pageIndex, pageSize]);
        // console.log("getAllWrapTokenRequests", response);
        return response;
    }
    async getAllUnsignedWrapTokenRequests(pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest("embedded.bridge.getAllUnsignedWrapTokenRequests", [
            pageIndex,
            pageSize,
        ]);
        // console.log("getAllUnsignedWrapTokenRequests", response);
        return response;
    }
    async getUnwrapTokenRequestById(hashID) {
        const response = await this.client.sendRequest("embedded.bridge.getUnwrapTokenRequestById", [hashID.toString()]);
        // console.log("getUnwrapTokenRequestById", response);
        return response;
    }
    async getAllUnwrapTokenRequestsByToAddress(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest("embedded.bridge.getAllUnwrapTokenRequestsByToAddress", [
            address,
            pageIndex,
            pageSize,
        ]);
        // console.log("getAllUnwrapTokenRequestsByToAddress", response);
        return response;
    }
    async getAllUnwrapTokenRequests(pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest("embedded.bridge.getAllUnwrapTokenRequests", [pageIndex, pageSize]);
        // console.log("getAllUnwrapTokenRequests", response);
        return response;
    }
    //
    // Contract methods
    //
    wrapToken(networkClass, chainId, toAddress, amount, tokenStandard) {
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.bridgeContractAddress, tokenStandard, amount, definitions_1.Definitions.bridge.encodeFunction("WrapToken", [networkClass, chainId, toAddress]));
    }
    redeem(transactionHash, tokenStandard, logIndex) {
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.bridgeContractAddress, tokenStandard, ethers_1.ethers.BigNumber.from("0"), definitions_1.Definitions.bridge.encodeFunction("Redeem", [transactionHash.toString(), logIndex]));
    }
}
exports.BridgeApi = BridgeApi;
