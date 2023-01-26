import { Client } from "../../client/interfaces";
import { FusionEntryList, GetRequiredParam, GetRequiredResponse, PlasmaInfo } from "../../model/embedded/plasma";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Address } from "../../model/primitives/address";
import { Hash } from "../../model/primitives/hash";
export declare class PlasmaApi {
    client: Client;
    setClient(client: Client): void;
    get(address: Address): Promise<PlasmaInfo>;
    getEntriesByAddress(address: Address, pageIndex?: number, pageSize?: number): Promise<FusionEntryList>;
    getRequiredFusionAmount(requiredPlasma: number): Promise<number>;
    getPlasmaByQsr(qsrAmount: number): number;
    getRequiredPoWForAccountBlock(powParam: GetRequiredParam): Promise<GetRequiredResponse>;
    fuse(beneficiary: Address, amount: number): Promise<AccountBlockTemplate>;
    cancel(id: Hash): Promise<AccountBlockTemplate>;
}
