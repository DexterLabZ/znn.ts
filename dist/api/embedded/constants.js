"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposalClosedStatus = exports.proposalPaidStatus = exports.proposalActiveStatus = exports.proposalVotingStatus = exports.proposalMinimumFundsInZnn = exports.proposalMaximumFundsInZnn = exports.proposalCreationCostInZnn = exports.proposalNameMaxLength = exports.proposalDescriptionMaxLength = exports.proposalUrlRegExp = exports.tokenDomainRegExp = exports.tokenSymbolExceptions = exports.tokenSymbolMaxLength = exports.tokenSymbolRegExp = exports.tokenNameRegExp = exports.tokenNameMaxLength = exports.tokenZtsIssueFeeInZnn = exports.stakeUnitDurationName = exports.stakeMinZnnAmount = exports.stakeTimeMaxSec = exports.stakeTimeUnitSec = exports.sentinelRegisterQsrAmount = exports.sentinelRegisterZnnAmount = exports.pillarNameRegExp = exports.pillarNameMaxLength = exports.pillarRegisterQsrAmount = exports.pillarRegisterZnnAmount = exports.minPlasmaAmount = exports.fuseMinQsrAmount = void 0;
const nom_constants_1 = require("../../utils/nom_constants");
const ethers_1 = require("ethers");
// Plasma
exports.fuseMinQsrAmount = 10 * nom_constants_1.oneQsr;
exports.minPlasmaAmount = 21000;
// Pillar
// export const pillarRegisterZnnAmount: BigNumber = 15000 * oneZnn;
// export const pillarRegisterQsrAmount: BigNumber = 150000 * oneQsr;
exports.pillarRegisterZnnAmount = ethers_1.ethers.BigNumber.from(15000).mul(ethers_1.ethers.BigNumber.from(nom_constants_1.oneZnn));
exports.pillarRegisterQsrAmount = ethers_1.ethers.BigNumber.from(150000).mul(ethers_1.ethers.BigNumber.from(nom_constants_1.oneQsr));
exports.pillarNameMaxLength = 40;
exports.pillarNameRegExp = RegExp("^([a-zA-Z0-9]+[-._]?)*[a-zA-Z0-9]$");
// Sentinel
// export const sentinelRegisterZnnAmount: number = 5000 * oneZnn;
// export const sentinelRegisterQsrAmount: number = 50000 * oneQsr;
exports.sentinelRegisterZnnAmount = ethers_1.ethers.BigNumber.from(5000).mul(ethers_1.ethers.BigNumber.from(nom_constants_1.oneZnn));
exports.sentinelRegisterQsrAmount = ethers_1.ethers.BigNumber.from(50000).mul(ethers_1.ethers.BigNumber.from(nom_constants_1.oneQsr));
// Staking
exports.stakeTimeUnitSec = 30 * 24 * 60 * 60;
exports.stakeTimeMaxSec = 12 * exports.stakeTimeUnitSec;
// export const stakeMinZnnAmount: number = oneZnn;
exports.stakeMinZnnAmount = ethers_1.ethers.BigNumber.from(nom_constants_1.oneZnn);
exports.stakeUnitDurationName = "month";
// Token
// export const tokenZtsIssueFeeInZnn: number = oneZnn;
exports.tokenZtsIssueFeeInZnn = ethers_1.ethers.BigNumber.from(nom_constants_1.oneZnn);
exports.tokenNameMaxLength = 40;
exports.tokenNameRegExp = RegExp("^([a-zA-Z0-9]+[-._]?)*[a-zA-Z0-9]$");
exports.tokenSymbolRegExp = RegExp("^[A-Z0-9]+$");
exports.tokenSymbolMaxLength = 10;
exports.tokenSymbolExceptions = ["ZNN", "QSR"];
exports.tokenDomainRegExp = RegExp("^([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9].)+[A-Za-z]{2,}$");
// Accelerator
exports.proposalUrlRegExp = RegExp("^[a-zA-Z0-9]{2,60}.[a-zA-Z]{1,6}([a-zA-Z0-9()@:%_\\+.~#?&/=-]{0,100})$");
exports.proposalDescriptionMaxLength = 240;
exports.proposalNameMaxLength = 30;
exports.proposalCreationCostInZnn = 10;
exports.proposalMaximumFundsInZnn = 5000;
exports.proposalMinimumFundsInZnn = 10;
exports.proposalVotingStatus = 0;
exports.proposalActiveStatus = 1;
exports.proposalPaidStatus = 2;
exports.proposalClosedStatus = 3;
