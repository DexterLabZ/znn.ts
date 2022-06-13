"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRequiredResponse = exports.GetRequiredParam = exports.PlasmaInfo = exports.FusionEntry = exports.FusionEntryList = void 0;
const bytes_1 = require("../../utils/bytes");
const account_block_template_1 = require("../nom/account_block_template");
const address_1 = require("../primitives/address");
const hash_1 = require("../primitives/hash");
class FusionEntryList {
    constructor(qsrAmount, count, list) {
        this.qsrAmount = qsrAmount;
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new FusionEntryList(json.qsrAmount, json.count, json.list.map((entry) => FusionEntry.fromJson(entry)));
    }
    toJson() {
        return {
            qsrAmount: this.qsrAmount,
            count: this.count,
            list: this.list.map((entry) => entry.toJson())
        };
    }
}
exports.FusionEntryList = FusionEntryList;
class FusionEntry {
    constructor(qsrAmount, beneficiary, expirationHeight, id, isRevocable) {
        this.qsrAmount = qsrAmount;
        this.beneficiary = beneficiary;
        this.expirationHeight = expirationHeight;
        this.id = id;
        this.isRevocable = isRevocable;
    }
    static fromJson(json) {
        return new FusionEntry(json.qsrAmount, address_1.Address.parse(json.beneficiary), json.expirationHeight, hash_1.Hash.parse(json.id), json.isRevocable);
    }
    toJson() {
        return {
            qsrAmount: this.qsrAmount,
            beneficiary: this.beneficiary.toString(),
            expirationHeight: this.expirationHeight,
            id: this.id.toString(),
        };
    }
}
exports.FusionEntry = FusionEntry;
class PlasmaInfo {
    constructor(currentPlasma, maxPlasma, qsrAmount) {
        this.currentPlasma = currentPlasma;
        this.maxPlasma = maxPlasma;
        this.qsrAmount = qsrAmount;
    }
    static fromJson(json) {
        return new PlasmaInfo(json.currentPlasma, json.maxPlasma, json.qsrAmount);
    }
    toJson() {
        return {
            currentPlasma: this.currentPlasma,
            maxPlasma: this.maxPlasma,
            qsrAmount: this.qsrAmount
        };
    }
}
exports.PlasmaInfo = PlasmaInfo;
class GetRequiredParam {
    constructor(address, blockType, toAddress, data) {
        if (blockType == account_block_template_1.BlockTypeEnum.userReceive) {
            toAddress = address;
        }
        this.address = address;
        this.blockType = blockType;
        this.toAddress = toAddress;
        // ToDo: Check if data is undefined
        this.data = data;
    }
    static fromJson(json) {
        return new GetRequiredParam(address_1.Address.parse(json.address), json.blockType, address_1.Address.parse(json.toAddress) == undefined ? undefined : address_1.Address.parse(json.toAddress), Buffer.from(json.data, 'hex'));
    }
    toJson() {
        return {
            address: this.address.toString(),
            blockType: this.blockType,
            toAddress: this.toAddress == undefined ? undefined : this.toAddress.toString(),
            // Q&A: Dart sdk doesn't do error handling for data
            data: this.data == undefined ? undefined : bytes_1.BytesUtils.bytesToBase64(this.data)
        };
    }
    toString() {
        return JSON.stringify(this.toJson());
    }
}
exports.GetRequiredParam = GetRequiredParam;
class GetRequiredResponse {
    constructor(availablePlasma, basePlasma, requiredDifficulty) {
        this.availablePlasma = availablePlasma;
        this.basePlasma = basePlasma;
        this.requiredDifficulty = requiredDifficulty;
    }
    static fromJson(json) {
        return new GetRequiredResponse(json.availablePlasma, json.basePlasma, json.requiredDifficulty);
    }
}
exports.GetRequiredResponse = GetRequiredResponse;
