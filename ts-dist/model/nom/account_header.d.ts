import { Address } from "../primitives/address";
import { Hash } from "../primitives/hash";
export declare class AccountHeader {
    address?: Address;
    hash?: Hash;
    height?: number;
    constructor(address?: Address, hash?: Hash, height?: number);
    static fromJson(json: {
        [key: string]: any;
    }): AccountHeader;
    toJson(): {
        [key: string]: any;
    };
    toString(): string;
}
