"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenApi = void 0;
const constants_1 = require("../../client/constants");
const definitions_1 = require("../../embedded/definitions");
const account_block_template_1 = require("../../model/nom/account_block_template");
const token_1 = require("../../model/nom/token");
const address_1 = require("../../model/primitives/address");
const token_standard_1 = require("../../model/primitives/token_standard");
const constants_2 = require("./constants");
class TokenApi {
    setClient(client) {
        this.client = client;
    }
    // 
    // RPC
    // 
    async getAll(pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.token.getAll', [pageIndex, pageSize]);
        return token_1.TokenList.fromJson(response);
    }
    async getByOwner(address, pageIndex = 0, pageSize = constants_1.rpcMaxPageSize) {
        const response = await this.client.sendRequest('embedded.token.getByOwner', [address.toString(), pageIndex, pageSize]);
        // ToDo: Add response validation
        return token_1.TokenList.fromJson(response);
    }
    async getByZts(tokenStandard) {
        const response = await this.client.sendRequest('embedded.token.getByZts', [tokenStandard.toString()]);
        // ToDo: Add response validation
        return response == null ? null : token_1.Token.fromJson(response);
    }
    // Contract methods
    async issueToken(tokenName, tokenSymbol, tokenDomain, totalSupply, maxSupply, decimals, mintable, burnable, utility) {
        let encodedFunction = definitions_1.Definitions.token.encodeFunction('IssueToken', [
            tokenName,
            tokenSymbol,
            tokenDomain,
            totalSupply,
            maxSupply,
            decimals,
            mintable,
            burnable,
            utility
        ]);
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.tokenAddress, token_standard_1.znnZts, constants_2.tokenZtsIssueFeeInZnn, encodedFunction);
    }
    async mint(tokenStandard, amount, receiveAddress) {
        let encodedFunction = definitions_1.Definitions.token.encodeFunction('Mint', [tokenStandard, amount, receiveAddress]);
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.tokenAddress, token_standard_1.znnZts, 0, encodedFunction);
    }
    async burnToken(tokenStandard, amount) {
        let encodedFunction = definitions_1.Definitions.token.encodeFunction('Burn', []);
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.tokenAddress, tokenStandard, amount, encodedFunction);
    }
    async updateToken(tokenStandard, owner, isMintable, isBurnable) {
        let encodedFunction = definitions_1.Definitions.token.encodeFunction('UpdateToken', [tokenStandard, owner, isMintable, isBurnable]);
        return account_block_template_1.AccountBlockTemplate.callContract(address_1.tokenAddress, token_standard_1.znnZts, 0, encodedFunction);
    }
}
exports.TokenApi = TokenApi;
