"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlasmaApi = void 0;
const constants_1 = require("../../client/constants");
const definitions_1 = require("../../embedded/definitions");
const plasma_1 = require("../../model/embedded/plasma");
const account_block_template_1 = require("../../model/nom/account_block_template");
const address_1 = require("../../model/primitives/address");
const token_standard_1 = require("../../model/primitives/token_standard");
class PlasmaApi {
    setClient(client) {
        this.client = client;
    }
    // 
    // RPC
    // 
    async get(address) {
        const response = await this.client.sendRequest('embedded.plasma.get', [address.toString()]);
        // ToDo: Add response validation
        return plasma_1.PlasmaInfo.fromJson(response);
    }
    async getEntriesByAddress(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        // ToDo: Add response validation
        const response = await this.client.sendRequest('embedded.plasma.getEntriesByAddress', [address.toString(), pageIndex, pageSize]);
        return plasma_1.FusionEntryList.fromJson(response);
    }
    async getRequiredFusionAmount(requiredPlasma) {
        const response = await this.client.sendRequest('embedded.plasma.getRequiredFusionAmount', [requiredPlasma]);
        // ToDo: This does not work!
        // {code: -32601, message: 'the method embedded.plasma.getRequiredFusionAmount does not exist/is not available'}
        return response;
    }
    getPlasmaByQsr(qsrAmount) {
        return qsrAmount * 2100;
    }
    async getRequiredPoWForAccountBlock(powParam) {
        const response = await this.client.sendRequest('embedded.plasma.getRequiredPoWForAccountBlock', [powParam.toJson()]);
        // ToDo: Add response validation
        return plasma_1.GetRequiredResponse.fromJson(response);
    }
    // 
    // Contract methods
    // 
    async fuse(beneficiary, amount) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.plasmaAddress, token_standard_1.qsrZts, amount, definitions_1.Definitions.plasma.encodeFunction("Fuse", [beneficiary]));
    }
    async cancel(id) {
        // ToDo: Add response validation
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.plasmaAddress, token_standard_1.qsrZts, 0, definitions_1.Definitions.plasma.encodeFunction("CancelFuse", [id.getBytes()]));
    }
}
exports.PlasmaApi = PlasmaApi;
