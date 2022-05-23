import { Abi } from "../abi/abi";
export class Definitions {
  static _plasmaDefinition: string = `[
    {"type":"function","name":"Fuse","inputs":[{"name":"address","type":"address"}]},
    {"type":"function","name":"CancelFuse","inputs":[{"name":"id","type":"hash"}]}
  ]`;

  static _pillarDefinition: string = `[
    {"type":"function","name":"Register","inputs":[{"name":"name","type":"string"},{"name":"producerAddress","type":"address"},{"name":"rewardAddress","type":"address"},{"name":"giveBlockRewardPercentage","type":"uint8"},{"name":"giveDelegateRewardPercentage","type":"uint8"}]},
    {"type":"function","name":"RegisterLegacy","inputs":[{"name":"name","type":"string"},{"name":"producerAddress","type":"address"},{"name":"rewardAddress","type":"address"},{"name":"giveBlockRewardPercentage","type":"uint8"},{"name":"giveDelegateRewardPercentage","type":"uint8"},{"name":"publicKey","type":"string"},{"name":"signature","type":"string"}]},
    {"type":"function","name":"Revoke","inputs":[{"name":"name","type":"string"}]},
    {"type":"function","name":"UpdatePillar","inputs":[{"name":"name","type":"string"},{"name":"producerAddress","type":"address"},{"name":"rewardAddress","type":"address"},{"name":"giveBlockRewardPercentage","type":"uint8"},{"name":"giveDelegateRewardPercentage","type":"uint8"}]},
    {"type":"function","name":"Delegate","inputs":[{"name":"name","type":"string"}]},
    {"type":"function","name":"Undelegate","inputs":[]}
  ]`;

  static _tokenDefinition: string = `[
    {"type":"function","name":"IssueToken","inputs":[{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"tokenDomain","type":"string"},{"name":"totalSupply","type":"uint256"},{"name":"maxSupply","type":"uint256"},{"name":"decimals","type":"uint8"},{"name":"isMintable","type":"bool"},{"name":"isBurnable","type":"bool"},{"name":"isUtility","type":"bool"}]},
    {"type":"function","name":"Mint","inputs":[{"name":"tokenStandard","type":"tokenStandard"},{"name":"amount","type":"uint256"},{"name":"receiveAddress","type":"address"}]},
    {"type":"function","name":"Burn","inputs":[]},
    {"type":"function","name":"UpdateToken","inputs":[{"name":"tokenStandard","type":"tokenStandard"},{"name":"owner","type":"address"},{"name":"isMintable","type":"bool"},{"name":"isBurnable","type":"bool"}]}
  ]`;

  static _sentinelDefinition: string = `[
    {"type":"function","name":"Register","inputs":[]},
    {"type":"function","name":"Revoke","inputs":[]}
  ]`;

  static _swapDefinition: string = `[
    {"type":"function","name":"RetrieveAssets","inputs":[{"name":"publicKey","type":"string"},{"name":"signature","type":"string"}]}
  ]`;

  static _stakeDefinition: string = `[
    {"type":"function","name":"Stake","inputs":[{"name":"durationInSec", "type":"int64"}]},
    {"type":"function","name":"Cancel","inputs":[{"name":"id","type":"hash"}]}
  ]`;

  static _acceleratorDefinition: string = `[
    {"type":"function","name":"CreateProject", "inputs":[{"name":"name","type":"string"},{"name":"description","type":"string"},
      {"name":"url","type":"string"},{"name":"fundsNeeded","type":"uint256"}]},
		{"type":"function","name":"AddPhase", "inputs":[
			{"name":"id","type":"hash"},{"name":"name","type":"string"},{"name":"description","type":"string"},
			{"name":"url","type":"string"},{"name":"fundsNeeded","type":"uint256"}]},
		{"type":"function","name":"UpdatePhase", "inputs":[
			{"name":"id","type":"hash"},{"name":"name","type":"string"},{"name":"description","type":"string"},
			{"name":"url","type":"string"},{"name":"fundsNeeded","type":"uint256"}]},
		{"type":"function","name":"Donate", "inputs":[]},
		{"type":"function","name":"UpdateProjects", "inputs":[]},
		{"type":"function","name":"VoteByName","inputs":[
			{"name":"id","type":"hash"},{"name":"name","type":"string"},{"name":"vote","type":"uint8"}]},
		{"type":"function","name":"VoteByProdAddress","inputs":[{"name":"id","type":"hash"},{"name":"vote","type":"uint8"}]}
  ]`;

  // Common definitions of embedded methods
  static _commonDefinition: string = `[
    {"type":"function","name":"DepositQsr","inputs":[]},
    {"type":"function","name":"WithdrawQsr","inputs":[]},
    {"type":"function","name":"CollectReward","inputs":[]}
  ]`;

  // ABI definitions of embedded contracts
  static plasma: Abi = Abi.fromJson(Definitions._plasmaDefinition);
  static pillar: Abi = Abi.fromJson(Definitions._pillarDefinition);
  static token: Abi = Abi.fromJson(Definitions._tokenDefinition);
  static sentinel: Abi = Abi.fromJson(Definitions._sentinelDefinition);
  static swap: Abi = Abi.fromJson(Definitions._swapDefinition);
  static stake: Abi = Abi.fromJson(Definitions._stakeDefinition);
  static accelerator: Abi = Abi.fromJson(Definitions._acceleratorDefinition);
  static common: Abi = Abi.fromJson(Definitions._commonDefinition);
}