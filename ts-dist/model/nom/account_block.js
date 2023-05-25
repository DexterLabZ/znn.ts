"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountBlockList = exports.AccountBlock = exports.AccountBlockConfirmationDetail = void 0;
const hash_1 = require("../primitives/hash");
const account_block_template_1 = require("./account_block_template");
const token_1 = require("./token");
const ethers_1 = require("ethers");
class AccountBlockConfirmationDetail {
    constructor(numConfirmations, momentumHeight, momentumHash, momentumTimestamp) {
        this.numConfirmations = numConfirmations;
        this.momentumHeight = momentumHeight;
        this.momentumHash = momentumHash;
        this.momentumTimestamp = momentumTimestamp;
    }
    static fromJson(json) {
        return new AccountBlockConfirmationDetail(json["numConfirmations"], json["momentumHeight"], hash_1.Hash.parse(json["momentumHash"]), json["momentumTimestamp"]);
    }
    static toJson(accountBlockConfirmationDetail) {
        return {
            numConfirmations: accountBlockConfirmationDetail.numConfirmations,
            momentumHeight: accountBlockConfirmationDetail.momentumHeight,
            momentumHash: accountBlockConfirmationDetail.momentumHash.toString(),
            momentumTimestamp: accountBlockConfirmationDetail.momentumTimestamp,
        };
    }
}
exports.AccountBlockConfirmationDetail = AccountBlockConfirmationDetail;
class AccountBlock extends account_block_template_1.AccountBlockTemplate {
    // Explaining the initializer list syntax from dart Class.fromJson(): key = json[key], key2=json[key2] { ...}
    // https://stackoverflow.com/a/68927725/7914222
    constructor(version, chainIdentifier, blockType, hash, previousHash, height, momentumAcknowledged, address, toAddress, amount, tokenStandard, fromBlockHash, data, fusedPlasma, difficulty, nonce, publicKey, signature, token, descendantBlocks, basePlasma, usedPlasma, changesHash, confirmationDetail, pairedAccountBlock) {
        super(version, chainIdentifier, blockType, hash, previousHash, height, momentumAcknowledged, address, toAddress, amount, tokenStandard, fromBlockHash, data, fusedPlasma, difficulty, nonce, publicKey, signature);
        this.token = token;
        this.descendantBlocks = descendantBlocks || [];
        this.basePlasma = basePlasma || 0;
        this.usedPlasma = usedPlasma || 0;
        this.changesHash = changesHash || hash_1.emptyHash;
        this.confirmationDetail = confirmationDetail;
        this.pairedAccountBlock = pairedAccountBlock;
    }
    static fromJson(json) {
        let accountBlockTemplate = super.fromJson(json);
        return new AccountBlock(accountBlockTemplate.version, accountBlockTemplate.chainIdentifier, accountBlockTemplate.blockType, accountBlockTemplate.hash, accountBlockTemplate.previousHash, accountBlockTemplate.height, accountBlockTemplate.momentumAcknowledged, accountBlockTemplate.address, accountBlockTemplate.toAddress, ethers_1.ethers.BigNumber.from(accountBlockTemplate.amount.toString()), accountBlockTemplate.tokenStandard, accountBlockTemplate.fromBlockHash, accountBlockTemplate.data, accountBlockTemplate.fusedPlasma, accountBlockTemplate.difficulty, accountBlockTemplate.nonce, accountBlockTemplate.publicKey, accountBlockTemplate.signature, json["token"] ? token_1.Token.fromJson(json["token"]) : undefined, json["descendantBlocks"]
            ? json["descendantBlocks"].map((block) => AccountBlock.fromJson(block))
            : [], json["basePlasma"], json["usedPlasma"], json["changesHash"] ? hash_1.Hash.parse(json["changesHash"]) : hash_1.emptyHash, json["confirmationDetail"] ? AccountBlockConfirmationDetail.fromJson(json["confirmationDetail"]) : undefined, json["pairedAccountBlock"] ? AccountBlock.fromJson(json["pairedAccountBlock"]) : undefined);
    }
    toJson() {
        let accountBlockTemplate = super.toJson();
        return {
            ...accountBlockTemplate,
            token: this.token ? this.token.toJson() : undefined,
            descendantBlocks: this.descendantBlocks.map((block) => block.toJson()),
            basePlasma: this.basePlasma,
            usedPlasma: this.usedPlasma,
            changesHash: this.changesHash.toString(),
            confirmationDetail: this.confirmationDetail
                ? AccountBlockConfirmationDetail.toJson(this.confirmationDetail)
                : undefined,
            pairedAccountBlock: this.pairedAccountBlock ? this.pairedAccountBlock.toJson() : undefined,
        };
    }
    isCompleted() {
        return this.confirmationDetail != null;
    }
}
exports.AccountBlock = AccountBlock;
class AccountBlockList {
    constructor(count, list, more) {
        this.count = count;
        this.list = list;
        this.more = more;
    }
    static fromJson(json) {
        return new AccountBlockList(json["count"], json["list"] ? json["list"].map((block) => AccountBlock.fromJson(block)) : [], json["more"]);
    }
    toJson() {
        return {
            count: this.count,
            list: this.list ? this.list.map((block) => block.toJson()) : [],
            more: this.more,
        };
    }
}
exports.AccountBlockList = AccountBlockList;
