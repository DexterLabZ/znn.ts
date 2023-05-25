"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountUtils = void 0;
const ethers_1 = require("ethers");
class AmountUtils {
    static extractNumberDecimals(num, decimals) {
        return num * Math.pow(10, decimals);
    }
    static addNumberDecimals(num, decimals) {
        return num / Math.pow(10, decimals);
    }
    static extractDecimals(num, decimals) {
        return ethers_1.ethers.utils.parseUnits(num.toString(), ethers_1.ethers.BigNumber.from(decimals));
        // return ethers.BigNumber.from(ethers.utils.parseUnits(num.toString(), ethers.BigNumber.from(decimals)).toString());
    }
    static addDecimals(num, decimals) {
        console.log("addDecimals - num", num);
        console.log("addDecimals - decimals", decimals);
        return ethers_1.ethers.utils.formatUnits(num, ethers_1.ethers.BigNumber.from(decimals));
        // return ethers.BigNumber.from(ethers.utils.formatUnits(num.toString(), ethers.BigNumber.from(decimals)).toString());
    }
}
exports.AmountUtils = AmountUtils;
