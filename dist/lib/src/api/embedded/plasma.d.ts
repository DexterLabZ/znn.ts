import { Client } from "../../client/interfaces";
import { FusionEntryList, GetRequiredParam, GetRequiredResponse, PlasmaInfo } from "../../model/embedded/plasma";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Address } from "../../model/primitives/address";
import { Hash } from "../../model/primitives/hash";
import BigNumber from "bignumber.js";
export declare class PlasmaApi {
    client: Client;
    setClient(client: Client): void;
    get(address: Address): Promise<PlasmaInfo>;
    getEntriesByAddress(address: Address, pageIndex?: number, pageSize?: number): Promise<FusionEntryList>;
    getRequiredFusionAmount(requiredPlasma: number | string | BigNumber): Promise<number | string | BigNumber>;
    getPlasmaByQsr(qsrAmount: number | string | BigNumber): number | string | BigNumber;
    getRequiredPoWForAccountBlock(powParam: GetRequiredParam): Promise<GetRequiredResponse>;
    fuse(beneficiary: Address, amount: number | string | BigNumber): Promise<AccountBlockTemplate>;
    cancel(id: Hash): Promise<AccountBlockTemplate>;
}
