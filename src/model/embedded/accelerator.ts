import {
  Address
} from "../primitives/address";
import {
  Hash
} from "../primitives/hash";
import {
  VoteBreakdown
} from "./common";
abstract class BaseProject {
  id: Hash;
  name: string;
  description: string;
  url: string;
  fundsNeeded: number;
  creationTimestamp: number;
  statusInt: number;
  voteBreakdown: VoteBreakdown;

  constructor(id: Hash, name: string, description: string, url: string, fundsNeeded: number, creationTimestamp: number, statusInt: number, voteBreakdown: VoteBreakdown) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.fundsNeeded = fundsNeeded;
    this.creationTimestamp = creationTimestamp;
    this.statusInt = statusInt;
    this.voteBreakdown = voteBreakdown;
  }

  // ToDo: Port latest changes from the dart SDK
}

class Phase extends BaseProject{
}

export class Project extends BaseProject {
  owner: Address;
  phaseIds: Array < Hash > ;
  phases: Array < Phase > ;
  _fundsReceived: number;
  _fundsToCollect: number;

  constructor(id: Hash, name: string, description: string, url: string, fundsNeeded: number, creationTimestamp: number, statusInt: number, voteBreakdown: VoteBreakdown, owner: Address, phaseIds: Array < Hash > , phases: Array < Phase > , fundsReceived: number, fundsToCollect: number) {
    super(id, name, description, url, fundsNeeded, creationTimestamp, statusInt, voteBreakdown);
    this.owner = owner;
    this.phaseIds = phaseIds;
    this.phases = phases;
    this._fundsReceived = fundsReceived;
    this._fundsToCollect = fundsToCollect;
  }
  // ToDo: Port latest changes from the dart SDK
}

export enum BaseProjectStatus {
  voting,
  active,
  paid,
  closed,
  wrongStatus
}

export enum BaseProjectVote {
  yes,
  no,
  abstain,
}