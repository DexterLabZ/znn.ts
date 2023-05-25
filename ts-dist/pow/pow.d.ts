import { Hash } from "../model/primitives/hash";
export declare enum PowStatus {
    generating = 0,
    done = 1
}
export declare function generatePoW(hash: Hash, difficulty: number): Promise<unknown>;
