import { GetRequiredParam } from "../embedded/plasma";
import { AccountBlockTemplate } from "../nom/account_block_template";
import { Address } from "./address";
import { Hash } from "./hash";
import { TokenStandard } from "./token_standard";
declare const Primitives: {
    Address: typeof Address;
    Hash: typeof Hash;
    GetRequiredParam: typeof GetRequiredParam;
    AccountBlockTemplate: typeof AccountBlockTemplate;
    TokenStandard: typeof TokenStandard;
};
declare const Constants: {
    znnZts: TokenStandard;
};
export { Primitives, Constants };
