export class AmountUtils{
  static extractDecimals(num: number, decimals: number): number{
    return num * Math.pow(10, decimals);
  }

  static addDecimals(num: number, decimals: number): number{
    return num / Math.pow(10, decimals);
  }
}