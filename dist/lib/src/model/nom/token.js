"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenList = exports.Token = void 0;
const address_1 = require("../primitives/address");
const token_standard_1 = require("../primitives/token_standard");
class Token {
    constructor(name, symbol, domain, totalSupply, decimals, owner, tokenStandard, maxSupply, isBurnable, isMintable, isUtility) {
        this.name = name;
        this.symbol = symbol;
        this.domain = domain;
        this.totalSupply = totalSupply;
        this.decimals = decimals;
        this.owner = owner;
        this.tokenStandard = tokenStandard;
        this.maxSupply = maxSupply;
        this.isBurnable = isBurnable;
        this.isMintable = isMintable;
        this.isUtility = isUtility;
    }
    static fromJson(json) {
        return new Token(json['name'], json['symbol'], json['domain'], json['totalSupply'], json['decimals'], address_1.Address.parse(json['owner']), token_standard_1.TokenStandard.parse(json['tokenStandard']), json['maxSupply'], json['isBurnable'], json['isMintable'], json['isUtility']);
    }
    toJson() {
        return {
            name: this.name,
            symbol: this.symbol,
            domain: this.domain,
            totalSupply: this.totalSupply,
            decimals: this.decimals,
            owner: this.owner.toString(),
            tokenStandard: this.tokenStandard.toString(),
            maxSupply: this.maxSupply,
            isBurnable: this.isBurnable,
            isMintable: this.isMintable,
            isUtility: this.isUtility
        };
    }
    decimalsExponent() {
        return Math.pow(10, this.decimals);
    }
}
exports.Token = Token;
class TokenList {
    constructor(count, list) {
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new TokenList(json['count'], json['list'].map((entry) => Token.fromJson(entry)));
    }
    toJson() {
        const data = {};
        data.count = this.count;
        if (data.list) {
            this.list && this.list.map((entry) => entry.toJson());
        }
        return data;
    }
}
exports.TokenList = TokenList;
