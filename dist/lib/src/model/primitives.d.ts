import { GetRequiredParam } from "./embedded/plasma";
import { AccountBlockTemplate } from "./nom/account_block_template";
import { Address } from "./primitives/address";
import { Hash } from "./primitives/hash";
import { TokenStandard } from "./primitives/token_standard";
declare const Primitives: {
    Address: typeof Address;
    Hash: typeof Hash;
    GetRequiredParam: typeof GetRequiredParam;
    AccountBlockTemplate: typeof AccountBlockTemplate;
    TokenStandard: typeof TokenStandard;
};
declare const Constants: {
    pillarAddress: Address;
    plasmaAddress: Address;
    stakeAddress: Address;
    znnTokenStandard: string;
    qsrTokenStandard: string;
    emptyTokenStandard: string;
    znnZts: TokenStandard;
    qsrZts: TokenStandard;
    emptyZts: TokenStandard;
};
export { Primitives, Constants };
