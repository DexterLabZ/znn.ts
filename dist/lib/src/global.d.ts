export declare class ZnnSdkException {
    message: string;
    constructor(message: string);
    toString(): string;
}
export declare const netId = 1;
export declare const defaultChainId = 1;
export declare const setChainIdentifier: (chainIdentifier?: number) => void;
export declare const getChainIdentifier: () => number;
