"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomentumList = exports.Momentum = void 0;
const address_1 = require("../primitives/address");
const hash_1 = require("./../primitives/hash");
const account_header_1 = require("./account_header");
class Momentum {
    constructor(version, chainIdentifier, hash, previousHash, height, timestamp, data, content, changesHash, publicKey, signature, producer) {
        this.version = version;
        this.chainIdentifier = chainIdentifier;
        this.hash = hash;
        this.previousHash = previousHash;
        this.height = height;
        this.timestamp = timestamp;
        this.data = data;
        this.content = content;
        this.changesHash = changesHash;
        this.publicKey = publicKey;
        this.signature = signature;
        this.producer = producer;
    }
    // ToDo: continue this.
    static fromJson(json) {
        return new Momentum(json.version, json.chainIdentifier, hash_1.Hash.parse(json.hash), hash_1.Hash.parse(json.previousHash), json.height, json.timestamp, Buffer.from(json.data, 'hex'), json.content?.map((j) => {
            return account_header_1.AccountHeader.fromJson(j);
        }), hash_1.Hash.parse(json.changesHash), json.publicKey || '', json.signature || '', address_1.Address.parse(json.producer));
    }
    toJson() {
        return {
            version: this.version,
            chainIdentifier: this.chainIdentifier,
            hash: this.hash.toString(),
            previousHash: this.previousHash.toString(),
            height: this.height,
            timestamp: this.timestamp,
            data: this.data.toString('hex'),
            content: this.content.map((c) => {
                return c.toString();
            }),
            changesHash: this.changesHash?.toString(),
            publicKey: this.publicKey,
            signature: this.signature,
            producer: this.producer.toString()
        };
    }
}
exports.Momentum = Momentum;
class MomentumList {
    constructor(count, list) {
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new MomentumList(json.count, json.list?.map((j) => {
            return Momentum.fromJson(j);
        }));
    }
    toJson() {
        return {
            count: this.count,
            list: this.list.map((m) => {
                return m.toJson();
            })
        };
    }
}
exports.MomentumList = MomentumList;
