import {PowStatus} from "./pow/pow";
import {GetRequiredParam} from "./model/embedded/plasma";
import {AccountBlockTemplate} from "./model/nom/account_block_template";
import {Address, pillarAddress, plasmaAddress, stakeAddress} from "./model/primitives/address";
import {Hash} from "./model/primitives/hash";
import {
  TokenStandard,
  znnTokenStandard,
  qsrTokenStandard,
  emptyTokenStandard,
  znnZts,
  qsrZts,
  emptyZts,
} from "./model/primitives/token_standard";
import {LiquidityStakeEntry, LiquidityStakeList, TokenTuple} from "./model/embedded/liquidity";
import {AccountBlock} from "./model/nom/account_block";
import {AccountInfo, BalanceInfoListItem} from "./model/nom/account_info";

const Primitives = {
  Address,
  Hash,
  GetRequiredParam,
  AccountBlock,
  AccountBlockTemplate,
  TokenStandard,
};

const Constants = {
  pillarAddress,
  plasmaAddress,
  stakeAddress,

  znnTokenStandard,
  qsrTokenStandard,
  emptyTokenStandard,
  znnZts,
  qsrZts,
  emptyZts,
};

const Enums = {
  PowStatus,
};
const Models = {
  AccountInfo,
  BalanceInfoListItem,
  TokenTuple,
  LiquidityStakeEntry,
  LiquidityStakeList,
};

export {Enums, Primitives, Constants, Models};
