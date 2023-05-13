import {oneQsr, oneZnn} from "../../utils/nom_constants";
import {BigNumber, ethers} from "ethers";

// Plasma
export const fuseMinQsrAmount: number = 10 * oneQsr;
export const minPlasmaAmount: number = 21000;

// Pillar
// export const pillarRegisterZnnAmount: BigNumber = 15000 * oneZnn;
// export const pillarRegisterQsrAmount: BigNumber = 150000 * oneQsr;
export const pillarRegisterZnnAmount: BigNumber = ethers.BigNumber.from(15000).mul(ethers.BigNumber.from(oneZnn));
export const pillarRegisterQsrAmount: BigNumber = ethers.BigNumber.from(150000).mul(ethers.BigNumber.from(oneQsr));
export const pillarNameMaxLength: number = 40;
export const pillarNameRegExp: RegExp = RegExp("^([a-zA-Z0-9]+[-._]?)*[a-zA-Z0-9]$");

// Sentinel
// export const sentinelRegisterZnnAmount: number = 5000 * oneZnn;
// export const sentinelRegisterQsrAmount: number = 50000 * oneQsr;
export const sentinelRegisterZnnAmount: BigNumber = ethers.BigNumber.from(5000).mul(ethers.BigNumber.from(oneZnn));
export const sentinelRegisterQsrAmount: BigNumber = ethers.BigNumber.from(50000).mul(ethers.BigNumber.from(oneQsr));

// Staking
export const stakeTimeUnitSec: number = 30 * 24 * 60 * 60;
export const stakeTimeMaxSec: number = 12 * stakeTimeUnitSec;
// export const stakeMinZnnAmount: number = oneZnn;
export const stakeMinZnnAmount: BigNumber = ethers.BigNumber.from(oneZnn);
export const stakeUnitDurationName: string = "month";

// Token
// export const tokenZtsIssueFeeInZnn: number = oneZnn;
export const tokenZtsIssueFeeInZnn: BigNumber = ethers.BigNumber.from(oneZnn);
export const tokenNameMaxLength: number = 40;
export const tokenNameRegExp: RegExp = RegExp("^([a-zA-Z0-9]+[-._]?)*[a-zA-Z0-9]$");
export const tokenSymbolRegExp: RegExp = RegExp("^[A-Z0-9]+$");
export const tokenSymbolMaxLength: number = 10;
export const tokenSymbolExceptions: Array<string> = ["ZNN", "QSR"];
export const tokenDomainRegExp: RegExp = RegExp("^([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9].)+[A-Za-z]{2,}$");

// Accelerator
export const proposalUrlRegExp: RegExp = RegExp(
  "^[a-zA-Z0-9]{2,60}.[a-zA-Z]{1,6}([a-zA-Z0-9()@:%_\\+.~#?&/=-]{0,100})$"
);
export const proposalDescriptionMaxLength: number = 240;
export const proposalNameMaxLength: number = 30;
export const proposalCreationCostInZnn: number = 10;
export const proposalMaximumFundsInZnn: number = 5000;
export const proposalMinimumFundsInZnn: number = 10;
export const proposalVotingStatus: number = 0;
export const proposalActiveStatus: number = 1;
export const proposalPaidStatus: number = 2;
export const proposalClosedStatus: number = 3;
