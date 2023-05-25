"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProjectVote = exports.BaseProjectStatus = exports.Project = void 0;
class BaseProject {
    constructor(id, name, description, url, fundsNeeded, creationTimestamp, statusInt, voteBreakdown) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.fundsNeeded = fundsNeeded;
        this.creationTimestamp = creationTimestamp;
        this.statusInt = statusInt;
        this.voteBreakdown = voteBreakdown;
    }
}
class Phase extends BaseProject {
}
class Project extends BaseProject {
    constructor(id, name, description, url, fundsNeeded, creationTimestamp, statusInt, voteBreakdown, owner, phaseIds, phases, fundsReceived, fundsToCollect) {
        super(id, name, description, url, fundsNeeded, creationTimestamp, statusInt, voteBreakdown);
        this.owner = owner;
        this.phaseIds = phaseIds;
        this.phases = phases;
        this._fundsReceived = fundsReceived;
        this._fundsToCollect = fundsToCollect;
    }
}
exports.Project = Project;
var BaseProjectStatus;
(function (BaseProjectStatus) {
    BaseProjectStatus[BaseProjectStatus["voting"] = 0] = "voting";
    BaseProjectStatus[BaseProjectStatus["active"] = 1] = "active";
    BaseProjectStatus[BaseProjectStatus["paid"] = 2] = "paid";
    BaseProjectStatus[BaseProjectStatus["closed"] = 3] = "closed";
    BaseProjectStatus[BaseProjectStatus["wrongStatus"] = 4] = "wrongStatus";
})(BaseProjectStatus = exports.BaseProjectStatus || (exports.BaseProjectStatus = {}));
var BaseProjectVote;
(function (BaseProjectVote) {
    BaseProjectVote[BaseProjectVote["yes"] = 0] = "yes";
    BaseProjectVote[BaseProjectVote["no"] = 1] = "no";
    BaseProjectVote[BaseProjectVote["abstain"] = 2] = "abstain";
})(BaseProjectVote = exports.BaseProjectVote || (exports.BaseProjectVote = {}));
