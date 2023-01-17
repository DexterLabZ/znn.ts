import { PowStatus } from "./pow/pow";
import { GetRequiredParam } from "./model/embedded/plasma";
import { AccountBlockTemplate } from "./model/nom/account_block_template";
import { Address } from "./model/primitives/address";
import { Hash } from "./model/primitives/hash";
import { TokenStandard } from "./model/primitives/token_standard";
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
declare const Enums: {
    PowStatus: typeof PowStatus;
};
export { Enums, Primitives, Constants };
