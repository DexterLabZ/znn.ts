import { Client } from "../../client/interfaces";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Hash } from "../../model/primitives/hash";
import { TokenStandard } from "../../model/primitives/token_standard";
import { BigNumber } from "ethers";
export declare class BridgeApi {
    client: Client;
    setClient(client: Client): void;
    getOrchestratorInfo(): Promise<any>;
    getBridgeInfo(): Promise<any>;
    getAllNetworks(pageIndex?: number, pageSize?: number): Promise<any>;
    getNetworkInfo(networkClass: number, chainId: number): Promise<any>;
    getWrapTokenRequestById(hashID: Hash): Promise<any>;
    getAllWrapTokenRequestsByToAddress(address: string, pageIndex?: number, pageSize?: number): Promise<any>;
    getAllWrapTokenRequests(pageIndex?: number, pageSize?: number): Promise<any>;
    getAllUnsignedWrapTokenRequests(pageIndex?: number, pageSize?: number): Promise<any>;
    getUnwrapTokenRequestById(hashID: Hash): Promise<any>;
    getAllUnwrapTokenRequestsByToAddress(address: string, pageIndex?: number, pageSize?: number): Promise<any>;
    getAllWrapTokenRequestsByToAddressNetworkClassAndChainId(address: string, networkClass: number, chainId: number, pageIndex?: number, pageSize?: number): Promise<any>;
    getAllUnwrapTokenRequestsByToAddressNetworkClassAndChainId(address: string, networkClass: number, chainId: number, pageIndex?: number, pageSize?: number): Promise<any>;
    getAllUnwrapTokenRequests(pageIndex?: number, pageSize?: number): Promise<any>;
    wrapToken(networkClass: number, chainId: number, toAddress: string, amount: BigNumber, tokenStandard: TokenStandard): AccountBlockTemplate;
    redeem(transactionHash: Hash, tokenStandard: TokenStandard, logIndex: number): AccountBlockTemplate;
}
