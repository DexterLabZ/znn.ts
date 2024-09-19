import { PowStatus } from "./pow/pow";
import { GetRequiredParam } from "./model/embedded/plasma";
import { AccountBlockTemplate } from "./model/nom/account_block_template";
import { Address, pillarAddress, plasmaAddress, stakeAddress } from "./model/primitives/address";
import { Hash } from "./model/primitives/hash";
import {
  TokenStandard,
  znnTokenStandard,
  qsrTokenStandard,
  emptyTokenStandard,
  znnZts,
  qsrZts,
  emptyZts,
} from "./model/primitives/token_standard";
import { LiquidityStakeEntry, LiquidityStakeList, TokenTuple } from "./model/embedded/liquidity";
import { AccountBlock } from "./model/nom/account_block";
import { AccountInfo, BalanceInfoListItem } from "./model/nom/account_info";
import { DEFAULT_CHAINID_PATH, DEFAULT_WALLET_PATH } from "./wallet/manager";
import { defaultChainId, netId } from "./global";

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

  DEFAULT_WALLET_PATH,
  DEFAULT_CHAINID_PATH,

  defaultChainId,
  netId,
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

const Libs = {
  Buffer: Buffer,
};

export { Enums, Primitives, Constants, Models, Libs };
