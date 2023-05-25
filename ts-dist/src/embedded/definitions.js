"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definitions = void 0;
const abi_1 = require("../abi/abi");
class Definitions {
}
exports.Definitions = Definitions;
Definitions._plasmaDefinition = `[
    {"type":"function","name":"Fuse","inputs":[{"name":"address","type":"address"}]},
    {"type":"function","name":"CancelFuse","inputs":[{"name":"id","type":"hash"}]}
  ]`;
Definitions._pillarDefinition = `[
    {"type":"function","name":"Register","inputs":[{"name":"name","type":"string"},{"name":"producerAddress","type":"address"},{"name":"rewardAddress","type":"address"},{"name":"giveBlockRewardPercentage","type":"uint8"},{"name":"giveDelegateRewardPercentage","type":"uint8"}]},
    {"type":"function","name":"RegisterLegacy","inputs":[{"name":"name","type":"string"},{"name":"producerAddress","type":"address"},{"name":"rewardAddress","type":"address"},{"name":"giveBlockRewardPercentage","type":"uint8"},{"name":"giveDelegateRewardPercentage","type":"uint8"},{"name":"publicKey","type":"string"},{"name":"signature","type":"string"}]},
    {"type":"function","name":"Revoke","inputs":[{"name":"name","type":"string"}]},
    {"type":"function","name":"UpdatePillar","inputs":[{"name":"name","type":"string"},{"name":"producerAddress","type":"address"},{"name":"rewardAddress","type":"address"},{"name":"giveBlockRewardPercentage","type":"uint8"},{"name":"giveDelegateRewardPercentage","type":"uint8"}]},
    {"type":"function","name":"Delegate","inputs":[{"name":"name","type":"string"}]},
    {"type":"function","name":"Undelegate","inputs":[]}
  ]`;
Definitions._tokenDefinition = `[
    {"type":"function","name":"IssueToken","inputs":[{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"tokenDomain","type":"string"},{"name":"totalSupply","type":"uint256"},{"name":"maxSupply","type":"uint256"},{"name":"decimals","type":"uint8"},{"name":"isMintable","type":"bool"},{"name":"isBurnable","type":"bool"},{"name":"isUtility","type":"bool"}]},
    {"type":"function","name":"Mint","inputs":[{"name":"tokenStandard","type":"tokenStandard"},{"name":"amount","type":"uint256"},{"name":"receiveAddress","type":"address"}]},
    {"type":"function","name":"Burn","inputs":[]},
    {"type":"function","name":"UpdateToken","inputs":[{"name":"tokenStandard","type":"tokenStandard"},{"name":"owner","type":"address"},{"name":"isMintable","type":"bool"},{"name":"isBurnable","type":"bool"}]}
  ]`;
Definitions._sentinelDefinition = `[
    {"type":"function","name":"Register","inputs":[]},
    {"type":"function","name":"Revoke","inputs":[]}
  ]`;
Definitions._swapDefinition = `[
    {"type":"function","name":"RetrieveAssets","inputs":[{"name":"publicKey","type":"string"},{"name":"signature","type":"string"}]}
  ]`;
Definitions._stakeDefinition = `[
    {"type":"function","name":"Stake","inputs":[{"name":"durationInSec", "type":"int64"}]},
    {"type":"function","name":"Cancel","inputs":[{"name":"id","type":"hash"}]}
  ]`;
Definitions._acceleratorDefinition = `[
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
Definitions._liquidityDefinition = `[
    {"type":"function","name":"LiquidityStake","inputs":[{"name":"durationInSec", "type":"int64"}]},
		{"type":"function","name":"CancelLiquidityStake","inputs":[{"name":"id","type":"hash"}]}
  ]`;
Definitions._bridgeDefinition = `
	[
		{"type":"function","name":"WrapToken", "inputs":[
			{"name":"networkClass","type":"uint32"},
			{"name":"chainId","type":"uint32"},
			{"name":"toAddress","type":"string"}
		]},

		{"type":"function","name":"UpdateWrapRequest", "inputs":[
			{"name":"id","type":"hash"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"AddNetwork", "inputs":[
			{"name":"type","type":"uint32"},
			{"name":"chainId","type":"uint32"},
			{"name":"name","type":"string"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"RemoveNetwork", "inputs":[
			{"name":"type","type":"uint32"},
			{"name":"chainId","type":"uint32"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"AddTokenPair","inputs":[
			{"name":"networkClass","type":"uint32"},
			{"name":"chainId","type":"uint32"},
			{"name":"tokenStandard","type":"tokenStandard"},
			{"name":"tokenAddress","type":"string"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"RemoveTokenPair","inputs":[
			{"name":"networkClass","type":"uint32"},
			{"name":"chainId","type":"uint32"},
			{"name":"tokenStandard","type":"tokenStandard"},
			{"name":"tokenAddress","type":"string"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"Halt","inputs":[
			{"name":"signature","type":"string"}
		]},
		
		{"type":"function","name":"ChangeTssECDSAPubKey","inputs":[
			{"name":"pubKey","type":"string"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"ChangeAdministratorEDDSAPubKey","inputs":[
			{"name":"pubKey","type":"string"},
			{"name":"signature","type":"string"}
		]},
		
		{"type":"function","name":"AddKeyGenHeight","inputs":[
			{"name":"height","type":"uint64"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"UnwrapToken","inputs":[
			{"name":"networkClass","type":"uint32"},
			{"name":"chainId","type":"uint32"},
			{"name":"transactionHash","type":"hash"},
			{"name":"toAddress","type":"address"},
			{"name":"tokenAddress","type":"string"},
			{"name":"amount","type":"uint256"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"RevokeUnwrapRequest","inputs":[
			{"name":"transactionHash","type":"hash"},
			{"name":"signature","type":"string"}
		]},

		{"type":"function","name":"Redeem","inputs":[
			{"name":"transactionHash","type":"hash"},
			{"name":"logIndex","type":"uint32"}
		]}
	]
		`;
Definitions._bridgeVariableDefinition = `
		[
		{"type":"variable","name":"wrapRequest","inputs":[
			{"name":"networkClass","type":"uint32"},
			{"name":"chainId", "type":"uint32"},
			{"name":"toAddress","type":"string"},
			{"name":"tokenStandard","type":"tokenStandard"},
			{"name":"tokenAddress","type":"string"},
			{"name":"amount","type":"uint256"},
			{"name":"signature","type":"string"}
		]},

		{"type":"variable","name":"unwrapRequest","inputs":[
			{"name":"registrationTime","type":"int64"},
			{"name":"networkClass","type":"uint32"},
			{"name":"chainId", "type":"uint32"},
			{"name":"toAddress","type":"address"},
			{"name":"tokenAddress","type":"string"},
			{"name":"amount","type":"uint256"},
			{"name":"signature","type":"string"},
			{"name":"redeemed","type":"uint8"},
			{"name":"revoked","type":"uint8"}
		]},

		{"type":"variable","name":"bridgeInfo","inputs":[
			{"name":"shouldKeyGenAt","type":"uint64"},
			{"name":"haltHeight","type":"uint64"},
			{"name":"tssECDSAPubKey","type":"string"},
			{"name":"administratorEDDSAPubKey","type":"string"},
			{"name":"actionCount","type":"uint64"}
		]},

		{"type":"variable","name":"networkInfo","inputs":[
			{"name":"type","type":"uint32"},
			{"name":"id","type":"uint32"},
			{"name":"name","type":"string"},
			{"name":"tokenStandards","type":"string[]"},
			{"name":"tokenAddresses","type":"string[]"}
		]}
	]`;
// Common definitions of embedded methods
Definitions._commonDefinition = `[
    {"type":"function","name":"DepositQsr","inputs":[]},
    {"type":"function","name":"WithdrawQsr","inputs":[]},
    {"type":"function","name":"CollectReward","inputs":[]}
  ]`;
// ABI definitions of embedded contracts
Definitions.plasma = abi_1.Abi.fromJson(Definitions._plasmaDefinition);
Definitions.pillar = abi_1.Abi.fromJson(Definitions._pillarDefinition);
Definitions.token = abi_1.Abi.fromJson(Definitions._tokenDefinition);
Definitions.sentinel = abi_1.Abi.fromJson(Definitions._sentinelDefinition);
Definitions.swap = abi_1.Abi.fromJson(Definitions._swapDefinition);
Definitions.stake = abi_1.Abi.fromJson(Definitions._stakeDefinition);
Definitions.accelerator = abi_1.Abi.fromJson(Definitions._acceleratorDefinition);
Definitions.common = abi_1.Abi.fromJson(Definitions._commonDefinition);
Definitions.bridge = abi_1.Abi.fromJson(Definitions._bridgeDefinition);
Definitions.liquidity = abi_1.Abi.fromJson(Definitions._liquidityDefinition);
