import BigNumber from "bignumber.js";
import { ethers } from "ethers";

export class AmountUtils{
  static extractNumberDecimals(num: number, decimals: number): number{
    return num * Math.pow(10, decimals);
  }

  static addNumberDecimals(num: number, decimals: number): number{
    return num / Math.pow(10, decimals);
  }
  
  static extractDecimals(num: BigNumber, decimals: number): BigNumber{
    return new BigNumber(ethers.utils.parseUnits(num.toString(), ethers.BigNumber.from(decimals)).toString());
  }

  static addDecimals(num: BigNumber, decimals: number): BigNumber{
    return new BigNumber(ethers.utils.formatUnits(num.toString(), ethers.BigNumber.from(decimals)).toString());
  }

}