import { Address } from "../primitives/address";
import { TokenStandard } from "../primitives/token_standard";

export class Token{
  name: string;
  symbol: string;
  domain: string;
  totalSupply: number;
  decimals: number;
  owner: Address;
  tokenStandard: TokenStandard;
  maxSupply: number;
  isBurnable: boolean;
  isMintable: boolean;
  isUtility: boolean;

  constructor(name: string, symbol: string, domain: string, totalSupply: number, decimals: number, owner: Address, tokenStandard: TokenStandard, maxSupply: number, isBurnable: boolean, isMintable: boolean, isUtility: boolean){
    this.name = name;
    this.symbol = symbol;
    this.domain = domain;
    this.totalSupply = totalSupply;
    this.decimals = decimals;
    this.owner = owner;
    this.tokenStandard = tokenStandard;
    this.maxSupply = maxSupply;
    this.isBurnable = isBurnable;
    this.isMintable = isMintable;
    this.isUtility = isUtility;
  }

  static fromJson(json: {[key: string]: any}): Token{
    return new Token(
      json['name'],
      json['symbol'],
      json['domain'],
      json['totalSupply'],
      json['decimals'],
      Address.parse(json['owner']),
      TokenStandard.parse(json['tokenStandard']),
      json['maxSupply'],
      json['isBurnable'],
      json['isMintable'],
      json['isUtility']
    );
  }

  toJson(): {[key: string]: any}{
    return {
      name: this.name,
      symbol: this.symbol,
      domain: this.domain,
      totalSupply: this.totalSupply,
      decimals: this.decimals,
      owner: this.owner.toString(),
      tokenStandard: this.tokenStandard.toString(),
      maxSupply: this.maxSupply,
      isBurnable: this.isBurnable,
      isMintable: this.isMintable,
      isUtility: this.isUtility
    };
  }

  decimalsExponent(){
    return Math.pow(10, this.decimals);
  }
}

export class TokenList{
  count: number;
  list: Array<Token>;

  constructor(count: number, list: Array<Token>){
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): TokenList{
    return new TokenList(
      json['count'],
      json['list'].map((entry: {[key: string]: any}) => Token.fromJson(entry))
    );
  }

  toJson(): {[key: string]: any}{
    const data: {[key: string]: any} = {};
    data.count = this.count;
    if(data.list){
      this.list && this.list.map((entry: {[key: string]: any}) => entry.toJson())
    }
    return data;
  }
}