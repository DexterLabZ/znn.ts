import { Client } from "../../client/interfaces";
import { RewardHistoryList, UncollectedReward } from "../../model/embedded/common";
import { DelegationInfo, PillarEpochHistoryList, PillarInfo, PillarInfoList } from "../../model/embedded/pillar";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Address } from "../../model/primitives/address";
import BigNumber from "bignumber.js";
export declare class PillarApi {
    client: Client;
    setClient(client: Client): void;
    getDepositedQsr(address: Address): Promise<BigNumber>;
    getUncollectedReward(address: Address): Promise<UncollectedReward>;
    getFrontierRewardByPage(address: Address, pageIndex?: number, pageSize?: number): Promise<RewardHistoryList>;
    getQsrRegistrationCost(): Promise<BigNumber>;
    getAll(pageIndex?: number, pageSize?: number): Promise<PillarInfoList>;
    getByOwner(address: Address): Promise<PillarInfo>;
    getByName(name: string): Promise<PillarInfo | null>;
    checkNameAvailability(name: string): Promise<PillarInfo>;
    getDelegatedPillar(address: Address): Promise<DelegationInfo | null>;
    getPillarsHistoryByEpoch(epoch: number, pageIndex?: number, pageSize?: number): Promise<PillarEpochHistoryList>;
    register(name: string, producerAddress: Address, rewardAddress: Address, giveBlockRewardPercentage?: number, giveDelegateRewardPercentage?: number): AccountBlockTemplate;
    registerLegacy(name: string, producerAddress: Address, rewardAddress: Address, publicKey: string, signature: string, giveBlockRewardPercentage?: number, giveDelegateRewardPercentage?: number): AccountBlockTemplate;
    updatePillar(name: string, producerAddress: Address, rewardAddress: Address, giveBlockRewardPercentage?: number, giveDelegateRewardPercentage?: number): AccountBlockTemplate;
    revoke(name: string): AccountBlockTemplate;
    delegate(name: string): AccountBlockTemplate;
    undelegate(): AccountBlockTemplate;
    collectReward(): AccountBlockTemplate;
    depositQsr(amount: BigNumber): AccountBlockTemplate;
    withdrawQsr(): AccountBlockTemplate;
}
