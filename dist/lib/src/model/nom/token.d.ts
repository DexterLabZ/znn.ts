import { Address } from "../primitives/address";
import { TokenStandard } from "../primitives/token_standard";
export declare class Token {
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
    constructor(name: string, symbol: string, domain: string, totalSupply: number, decimals: number, owner: Address, tokenStandard: TokenStandard, maxSupply: number, isBurnable: boolean, isMintable: boolean, isUtility: boolean);
    static fromJson(json: {
        [key: string]: any;
    }): Token;
    toJson(): {
        [key: string]: any;
    };
    decimalsExponent(): number;
}
export declare class TokenList {
    count: number;
    list: Array<Token>;
    constructor(count: number, list: Array<Token>);
    static fromJson(json: {
        [key: string]: any;
    }): TokenList;
    toJson(): {
        [key: string]: any;
    };
}
