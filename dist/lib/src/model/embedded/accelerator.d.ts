import { Address } from "../primitives/address";
import { Hash } from "../primitives/hash";
import { VoteBreakdown } from "./common";
declare abstract class BaseProject {
    id: Hash;
    name: string;
    description: string;
    url: string;
    fundsNeeded: number;
    creationTimestamp: number;
    statusInt: number;
    voteBreakdown: VoteBreakdown;
    constructor(id: Hash, name: string, description: string, url: string, fundsNeeded: number, creationTimestamp: number, statusInt: number, voteBreakdown: VoteBreakdown);
}
declare class Phase extends BaseProject {
}
export declare class Project extends BaseProject {
    owner: Address;
    phaseIds: Array<Hash>;
    phases: Array<Phase>;
    _fundsReceived: number;
    _fundsToCollect: number;
    constructor(id: Hash, name: string, description: string, url: string, fundsNeeded: number, creationTimestamp: number, statusInt: number, voteBreakdown: VoteBreakdown, owner: Address, phaseIds: Array<Hash>, phases: Array<Phase>, fundsReceived: number, fundsToCollect: number);
}
export declare enum BaseProjectStatus {
    voting = 0,
    active = 1,
    paid = 2,
    closed = 3,
    wrongStatus = 4
}
export declare enum BaseProjectVote {
    yes = 0,
    no = 1,
    abstain = 2
}
export {};
