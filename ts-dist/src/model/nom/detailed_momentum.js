"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedMomentumList = exports.DetailedMomentum = void 0;
const momentum_1 = require("./momentum");
class DetailedMomentum {
    constructor(blocks, momentum) {
        this.blocks = blocks;
        this.momentum = momentum;
    }
    static fromJson(json) {
        return new DetailedMomentum(json['blocks'], momentum_1.Momentum.fromJson(json['momentum']));
    }
    toJson() {
        return {
            blocks: this.blocks,
            momentum: this.momentum.toJson()
        };
    }
}
exports.DetailedMomentum = DetailedMomentum;
class DetailedMomentumList {
    constructor(count, list) {
        this.count = count;
        this.list = list;
    }
    static fromJson(json) {
        return new DetailedMomentumList(json['count'], json['list'].map((item) => DetailedMomentum.fromJson(item)));
    }
    toJson() {
        return {
            count: this.count,
            list: this.list
        };
    }
}
exports.DetailedMomentumList = DetailedMomentumList;
