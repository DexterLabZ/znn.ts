import {Address} from "../primitives/address";
import {emptyHash, Hash} from "../primitives/hash";
import {HashHeight} from "../primitives/hash_height";
import {TokenStandard} from "../primitives/token_standard";
import {AccountBlockTemplate} from "./account_block_template";
import {Token} from "./token";
import BigNumber from "bignumber.js";

export class AccountBlockConfirmationDetail {
  numConfirmations: number;
  momentumHeight: number;
  momentumHash: Hash;
  momentumTimestamp: number;

  constructor(numConfirmations: number, momentumHeight: number, momentumHash: Hash, momentumTimestamp: number) {
    this.numConfirmations = numConfirmations;
    this.momentumHeight = momentumHeight;
    this.momentumHash = momentumHash;
    this.momentumTimestamp = momentumTimestamp;
  }

  static fromJson(json: {[key: string]: any}): AccountBlockConfirmationDetail {
    return new AccountBlockConfirmationDetail(
      json["numConfirmations"],
      json["momentumHeight"],
      Hash.parse(json["momentumHash"]),
      json["momentumTimestamp"]
    );
  }

  static toJson(accountBlockConfirmationDetail: AccountBlockConfirmationDetail): {[key: string]: any} {
    return {
      numConfirmations: accountBlockConfirmationDetail.numConfirmations,
      momentumHeight: accountBlockConfirmationDetail.momentumHeight,
      momentumHash: accountBlockConfirmationDetail.momentumHash.toString(),
      momentumTimestamp: accountBlockConfirmationDetail.momentumTimestamp,
    };
  }
}

export class AccountBlock extends AccountBlockTemplate {
  descendantBlocks: Array<AccountBlock>;
  basePlasma: number;
  usedPlasma: number;
  changesHash: Hash;

  token?: Token;

  confirmationDetail?: AccountBlockConfirmationDetail;

  pairedAccountBlock?: AccountBlock;

  // Explaining the initializer list syntax from dart Class.fromJson(): key = json[key], key2=json[key2] { ...}
  // https://stackoverflow.com/a/68927725/7914222

  constructor(
    version: number,
    chainIdentifier: number,
    blockType: number,
    hash: Hash,
    previousHash: Hash,
    height: number,
    momentumAcknowledged: HashHeight,
    address: Address,
    toAddress: Address,
    amount: BigNumber,
    tokenStandard: TokenStandard,
    fromBlockHash: Hash,
    data: Buffer,
    fusedPlasma: number,
    difficulty: number,
    nonce: string,
    publicKey: Buffer,
    signature: Buffer,
    token?: Token,
    descendantBlocks?: Array<AccountBlock>,
    basePlasma?: number,
    usedPlasma?: number,
    changesHash?: Hash,
    confirmationDetail?: AccountBlockConfirmationDetail,
    pairedAccountBlock?: AccountBlock
  ) {
    super(
      version,
      chainIdentifier,
      blockType,
      hash,
      previousHash,
      height,
      momentumAcknowledged,
      address,
      toAddress,
      amount,
      tokenStandard,
      fromBlockHash,
      data,
      fusedPlasma,
      difficulty,
      nonce,
      publicKey,
      signature
    );
    this.token = token;
    this.descendantBlocks = descendantBlocks || [];
    this.basePlasma = basePlasma || 0;
    this.usedPlasma = usedPlasma || 0;
    this.changesHash = changesHash || emptyHash;
    this.confirmationDetail = confirmationDetail;
    this.pairedAccountBlock = pairedAccountBlock;
  }

  static fromJson(json: {[key: string]: any}): AccountBlock {
    let accountBlockTemplate = super.fromJson(json);
    return new AccountBlock(
      accountBlockTemplate.version,
      accountBlockTemplate.chainIdentifier,
      accountBlockTemplate.blockType,
      accountBlockTemplate.hash,
      accountBlockTemplate.previousHash,
      accountBlockTemplate.height,
      accountBlockTemplate.momentumAcknowledged,
      accountBlockTemplate.address,
      accountBlockTemplate.toAddress,
      new BigNumber(accountBlockTemplate.amount.toString()),
      accountBlockTemplate.tokenStandard,
      accountBlockTemplate.fromBlockHash,
      accountBlockTemplate.data,
      accountBlockTemplate.fusedPlasma,
      accountBlockTemplate.difficulty,
      accountBlockTemplate.nonce,
      accountBlockTemplate.publicKey,
      accountBlockTemplate.signature,
      json["token"] ? Token.fromJson(json["token"]) : undefined,
      json["descendantBlocks"]
        ? json["descendantBlocks"].map((block: {[key: string]: any}) => AccountBlock.fromJson(block))
        : [],
      json["basePlasma"],
      json["usedPlasma"],
      json["changesHash"] ? Hash.parse(json["changesHash"]) : emptyHash,
      json["confirmationDetail"] ? AccountBlockConfirmationDetail.fromJson(json["confirmationDetail"]) : undefined,
      json["pairedAccountBlock"] ? AccountBlock.fromJson(json["pairedAccountBlock"]) : undefined
    );
  }

  toJson(): {[key: string]: any} {
    let accountBlockTemplate = super.toJson();
    return {
      ...accountBlockTemplate,
      token: this.token ? this.token.toJson() : undefined,
      descendantBlocks: this.descendantBlocks.map((block: AccountBlock) => block.toJson()),
      basePlasma: this.basePlasma,
      usedPlasma: this.usedPlasma,
      changesHash: this.changesHash.toString(),
      confirmationDetail: this.confirmationDetail
        ? AccountBlockConfirmationDetail.toJson(this.confirmationDetail)
        : undefined,
      pairedAccountBlock: this.pairedAccountBlock ? this.pairedAccountBlock.toJson() : undefined,
    };
  }

  isCompleted(): boolean {
    return this.confirmationDetail != null;
  }
}

export class AccountBlockList {
  count?: number;
  list?: Array<AccountBlock>;

  // If true, there are more elements that can be retrieved
  more?: boolean;

  constructor(count?: number, list?: Array<AccountBlock>, more?: boolean) {
    this.count = count;
    this.list = list;
    this.more = more;
  }

  static fromJson(json: {[key: string]: any}): AccountBlockList {
    return new AccountBlockList(
      json["count"],
      json["list"] ? json["list"].map((block: {[key: string]: any}) => AccountBlock.fromJson(block)) : [],
      json["more"]
    );
  }

  toJson(): {[key: string]: any} {
    return {
      count: this.count,
      list: this.list ? this.list.map((block: AccountBlock) => block.toJson()) : [],
      more: this.more,
    };
  }
}
