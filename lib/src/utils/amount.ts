import {BigNumber, ethers} from "ethers";

export class AmountUtils {
  static extractNumberDecimals(num: number, decimals: number): number {
    return num * Math.pow(10, decimals);
  }

  static addNumberDecimals(num: number, decimals: number): number {
    return num / Math.pow(10, decimals);
  }

  static extractDecimals(num: BigNumber, decimals: number): BigNumber {
    return ethers.utils.parseUnits(num.toString(), ethers.BigNumber.from(decimals));
    // return ethers.BigNumber.from(ethers.utils.parseUnits(num.toString(), ethers.BigNumber.from(decimals)).toString());
  }

  static addDecimals(num: BigNumber, decimals: number): string {
    console.log("addDecimals - num", num);
    console.log("addDecimals - decimals", decimals);
    return ethers.utils.formatUnits(num, ethers.BigNumber.from(decimals));
    // return ethers.BigNumber.from(ethers.utils.formatUnits(num.toString(), ethers.BigNumber.from(decimals)).toString());
  }
}
