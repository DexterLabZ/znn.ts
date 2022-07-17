import { GetRequiredParam } from "./embedded/plasma";
import { AccountBlockTemplate } from "./nom/account_block_template";
import { 
  Address,
  pillarAddress, 
  plasmaAddress, 
  stakeAddress 
} from "./primitives/address";
import { Hash } from "./primitives/hash";
import {
  TokenStandard,
  znnTokenStandard,
  qsrTokenStandard,
  emptyTokenStandard,
  znnZts,
  qsrZts,
  emptyZts
} from "./primitives/token_standard";

const Primitives = {
  Address,
  Hash,
  GetRequiredParam,
  AccountBlockTemplate,
  TokenStandard
}

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
}

export { Primitives, Constants };