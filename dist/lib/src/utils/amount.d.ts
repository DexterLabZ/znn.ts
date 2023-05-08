import BigNumber from "bignumber.js";
export declare class AmountUtils {
    static extractNumberDecimals(num: number, decimals: number): number;
    static addNumberDecimals(num: number, decimals: number): number;
    static extractDecimals(num: BigNumber, decimals: number): BigNumber;
    static addDecimals(num: BigNumber, decimals: number): BigNumber;
}
