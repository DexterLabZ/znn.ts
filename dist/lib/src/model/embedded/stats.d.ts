import { Address } from "../primitives/address";
export declare class ExtraData {
    affiliate: Address;
    constructor(affiliate: Address);
    static fromJson(json: {
        [key: string]: any;
    }): ExtraData;
    toJson(): {
        [key: string]: any;
    };
}
