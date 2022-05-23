import { GetRequiredParam } from "../embedded/plasma";
import { AccountBlockTemplate } from "../nom/account_block_template";
import { Address } from "./address";
import { Hash } from "./hash";
import { TokenStandard, znnZts } from "./token_standard";

const Primitives = {
  Address,
  Hash,
  GetRequiredParam,
  AccountBlockTemplate,
  TokenStandard
}

const Constants = {
  znnZts
}

export { Primitives, Constants };