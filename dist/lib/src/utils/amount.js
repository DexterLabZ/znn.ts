"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountUtils = void 0;
class AmountUtils {
    static extractDecimals(num, decimals) {
        return num * Math.pow(10, decimals);
    }
    static addDecimals(num, decimals) {
        return num / Math.pow(10, decimals);
    }
}
exports.AmountUtils = AmountUtils;
