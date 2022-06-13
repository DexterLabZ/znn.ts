"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBech32Bits = void 0;
const convertBech32Bits = function (data, from, to, pad) {
    let acc = 0;
    let bits = 0;
    let result = [];
    let maxv = (1 << to) - 1;
    data.forEach((v) => {
        if (v < 0 || (v >> from) != 0) {
            throw Error();
        }
        acc = (acc << from) | v;
        bits += from;
        while (bits >= to) {
            bits -= to;
            result.push((acc >> bits) & maxv);
        }
    });
    if (pad) {
        if (bits > 0) {
            result.push((acc << (to - bits)) & maxv);
        }
    }
    else if (bits >= from) {
        throw Error('Illegal zero padding');
    }
    else if (((acc << (to - bits)) & maxv) != 0) {
        throw Error('Non zero');
    }
    return Buffer.from(result);
};
exports.convertBech32Bits = convertBech32Bits;