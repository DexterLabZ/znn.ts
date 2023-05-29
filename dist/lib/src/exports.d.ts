import { PowStatus } from "./pow/pow";
import { GetRequiredParam } from "./model/embedded/plasma";
import { AccountBlockTemplate } from "./model/nom/account_block_template";
import { Address } from "./model/primitives/address";
import { Hash } from "./model/primitives/hash";
import { TokenStandard } from "./model/primitives/token_standard";
import { LiquidityStakeEntry, LiquidityStakeList, TokenTuple } from "./model/embedded/liquidity";
import { AccountBlock } from "./model/nom/account_block";
import { AccountInfo, BalanceInfoListItem } from "./model/nom/account_info";
declare const Primitives: {
    Address: typeof Address;
    Hash: typeof Hash;
    GetRequiredParam: typeof GetRequiredParam;
    AccountBlock: typeof AccountBlock;
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
    DEFAULT_WALLET_PATH: string;
    DEFAULT_CHAINID_PATH: string;
    defaultChainId: number;
    netId: number;
};
declare const Enums: {
    PowStatus: typeof PowStatus;
};
declare const Models: {
    AccountInfo: typeof AccountInfo;
    BalanceInfoListItem: typeof BalanceInfoListItem;
    TokenTuple: typeof TokenTuple;
    LiquidityStakeEntry: typeof LiquidityStakeEntry;
    LiquidityStakeList: typeof LiquidityStakeList;
};
export { Enums, Primitives, Constants, Models };
