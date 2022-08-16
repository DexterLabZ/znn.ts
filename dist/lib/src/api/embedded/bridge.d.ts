import { Client } from "../../client/interfaces";
import { AccountBlockTemplate } from "../../model/nom/account_block_template";
import { Hash } from "../../model/primitives/hash";
import { TokenStandard } from "../../model/primitives/token_standard";
export declare class BridgeApi {
    client: Client;
    setClient(client: Client): void;
    getBridgeInfo(): Promise<any>;
    getNetworkInfo(networkType: number, chainId: number): Promise<any>;
    getWrapTokenRequestById(hashID: Hash): Promise<any>;
    getAllWrapTokenRequests(pageIndex?: number, pageSize?: number): Promise<any>;
    getAllUnsignedWrapTokenRequests(pageIndex?: number, pageSize?: number): Promise<any>;
    getUnwrapTokenRequestById(hashID: Hash): Promise<any>;
    getAllUnwrapTokenRequests(pageIndex?: number, pageSize?: number): Promise<any>;
    wrapToken(networkType: number, chainId: number, toAddress: string, amount: number, tokenStandard: TokenStandard): AccountBlockTemplate;
    redeem(transactionHash: Hash, tokenStandard: TokenStandard): AccountBlockTemplate;
}
