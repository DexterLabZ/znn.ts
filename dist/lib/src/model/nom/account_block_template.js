"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountBlockTemplate = exports.BlockTypeEnum = void 0;
const global_1 = require("../../global");
const bytes_1 = require("../../utils/bytes");
const address_1 = require("../primitives/address");
const hash_1 = require("../primitives/hash");
const hash_height_1 = require("../primitives/hash_height");
const token_standard_1 = require("../primitives/token_standard");
var BlockTypeEnum;
(function (BlockTypeEnum) {
    BlockTypeEnum[BlockTypeEnum["unknown"] = 0] = "unknown";
    BlockTypeEnum[BlockTypeEnum["genesisReceive"] = 1] = "genesisReceive";
    BlockTypeEnum[BlockTypeEnum["userSend"] = 2] = "userSend";
    BlockTypeEnum[BlockTypeEnum["userReceive"] = 3] = "userReceive";
    BlockTypeEnum[BlockTypeEnum["contractSend"] = 4] = "contractSend";
    BlockTypeEnum[BlockTypeEnum["contractReceive"] = 5] = "contractReceive";
})(BlockTypeEnum = exports.BlockTypeEnum || (exports.BlockTypeEnum = {}));
class AccountBlockTemplate {
    constructor(version = 1, chainIdentifier = global_1.netId, blockType, hash = hash_1.emptyHash, previousHash = hash_1.emptyHash, height = 0, momentumAcknowledged = hash_height_1.emptyHashHeight, address = address_1.emptyAddress, toAddress = address_1.emptyAddress, amount = 0, tokenStandard = token_standard_1.TokenStandard.parse(token_standard_1.emptyTokenStandard), fromBlockHash = hash_1.emptyHash, data = Buffer.from([]), fusedPlasma = 0, difficulty = 0, nonce = "", publicKey = Buffer.from([]), signature = Buffer.from([])) {
        this.version = version;
        this.chainIdentifier = chainIdentifier;
        this.blockType = blockType;
        this.hash = hash;
        this.previousHash = previousHash;
        this.height = height;
        this.momentumAcknowledged = momentumAcknowledged;
        this.address = address;
        this.toAddress = toAddress;
        this.amount = amount;
        this.tokenStandard = tokenStandard;
        this.fromBlockHash = fromBlockHash;
        this.data = data;
        this.fusedPlasma = fusedPlasma;
        this.difficulty = difficulty;
        this.nonce = nonce;
        this.publicKey = publicKey;
        this.signature = signature;
    }
    static fromJson(json) {
        return new AccountBlockTemplate(json['version'], json['chainIdentifier'], json['blockType'], hash_1.Hash.parse(json['hash']), hash_1.Hash.parse(json['previousHash']), json['height'], hash_height_1.HashHeight.fromJson(json['momentumAcknowledged']), address_1.Address.parse(json['address']), address_1.Address.parse(json['toAddress']), json['amount'], token_standard_1.TokenStandard.parse(json['tokenStandard']), hash_1.Hash.parse(json['fromBlockHash']), (json['data'] == null
            ? Buffer.from([])
            : json['data'] == ''
                ? Buffer.from([])
                : Buffer.from(json['data'])), json['fusedPlasma'], json['difficulty'], json['nonce'], (json['publicKey'] != null
            ? Buffer.from(json['publicKey'])
            : Buffer.from([])), (json['signature'] != null
            ? Buffer.from(json['signature'])
            : Buffer.from([])));
    }
    toJson() {
        return {
            version: this.version,
            chainIdentifier: this.chainIdentifier,
            blockType: this.blockType,
            hash: this.hash.toString(),
            previousHash: this.previousHash.toString(),
            height: this.height,
            momentumAcknowledged: this.momentumAcknowledged.toJson(),
            address: this.address.toString(),
            toAddress: this.toAddress.toString(),
            amount: this.amount,
            tokenStandard: this.tokenStandard.toString(),
            fromBlockHash: this.fromBlockHash.toString(),
            data: bytes_1.BytesUtils.bytesToBase64(this.data),
            fusedPlasma: this.fusedPlasma,
            difficulty: this.difficulty,
            nonce: this.nonce,
            publicKey: bytes_1.BytesUtils.bytesToBase64(this.publicKey),
            signature: bytes_1.BytesUtils.bytesToBase64(this.signature)
        };
    }
    static receive(fromBlockHash) {
        return new AccountBlockTemplate(undefined, undefined, BlockTypeEnum.userReceive, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, fromBlockHash, undefined, undefined, undefined, undefined, undefined, undefined);
    }
    static send(toAddress, tokenStandard, amount) {
        return new AccountBlockTemplate(undefined, undefined, BlockTypeEnum.userSend, undefined, undefined, undefined, undefined, undefined, toAddress, amount, tokenStandard, undefined, undefined, undefined, undefined, undefined, undefined);
    }
    static callContract(address, tokenStandard, amount, data) {
        return new AccountBlockTemplate(undefined, undefined, BlockTypeEnum.userSend, undefined, undefined, undefined, undefined, undefined, address, amount, tokenStandard, undefined, data, undefined, undefined, undefined, undefined);
    }
    toString() {
        return JSON.stringify(this.toJson());
    }
}
exports.AccountBlockTemplate = AccountBlockTemplate;
