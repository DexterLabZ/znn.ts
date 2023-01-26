import { AccountBlock } from "./account_block";
import { Momentum } from "./momentum";
export declare class DetailedMomentum {
    blocks: Array<AccountBlock>;
    momentum: Momentum;
    constructor(blocks: Array<AccountBlock>, momentum: Momentum);
    static fromJson(json: {
        [key: string]: any;
    }): DetailedMomentum;
    toJson(): {
        [key: string]: any;
    };
}
export declare class DetailedMomentumList {
    count?: number;
    list?: Array<DetailedMomentum>;
    constructor(count?: number, list?: Array<DetailedMomentum>);
    static fromJson(json: {
        [key: string]: any;
    }): DetailedMomentumList;
    toJson(): {
        [key: string]: any;
    };
}
