import { Client } from "../../client/interfaces";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Token, TokenList } from "../../model/nom/token";
import { Address } from "../../model/primitives/address";
import { TokenStandard } from "../../model/primitives/token_standard";
export declare class TokenApi {
    client: Client;
    setClient(client: Client): void;
    getAll(pageIndex?: number, pageSize?: number): Promise<TokenList>;
    getByOwner(address: Address, pageIndex?: number, pageSize?: number): Promise<TokenList>;
    getByZts(tokenStandard: TokenStandard): Promise<Token | null>;
    issueToken(tokenName: string, tokenSymbol: string, tokenDomain: string, totalSupply: number, maxSupply: number, decimals: number, mintable: boolean, burnable: boolean, utility: boolean): Promise<AccountBlockTemplate>;
    mint(tokenStandard: TokenStandard, amount: number, receiveAddress: Address): Promise<AccountBlockTemplate>;
    burnToken(tokenStandard: TokenStandard, amount: number): Promise<AccountBlockTemplate>;
    updateToken(tokenStandard: TokenStandard, owner: Address, isMintable: boolean, isBurnable: boolean): Promise<AccountBlockTemplate>;
}
