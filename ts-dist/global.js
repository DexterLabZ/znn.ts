"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.netId = exports.ZnnSdkException = void 0;
class ZnnSdkException {
    constructor(message) {
        this.message = message;
    }
    toString() {
        if (this.message == null)
            return "Zenon SDK Exception";
        return "Zenon SDK Exception: " + this.message;
    }
}
exports.ZnnSdkException = ZnnSdkException;
exports.netId = 3;
