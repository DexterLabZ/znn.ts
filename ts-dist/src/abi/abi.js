"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbiFunction = exports.Param = exports.Entry = exports.Abi = void 0;
const sha3_1 = require("sha3");
const abi_types_1 = require("./abi_types");
class Abi {
    constructor(entries) {
        this.entries = entries;
    }
    static fromJson(j) {
        return new Abi(Abi._parseEntries(j));
    }
    static _parseEntries(j) {
        let entries = new Array();
        j = JSON.parse(j);
        for (let json of j) {
            let name;
            let inputs = new Array();
            name = json["name"];
            if (json["type"] != "function") {
                throw new Error("Invalid ABI entry type: " + json["type"]);
            }
            if (json["inputs"] != null) {
                for (let input of json["inputs"]) {
                    inputs.push(new Param(input["name"], abi_types_1.AbiType.getType(input["type"])));
                }
            }
            // ToDo: Forced cast (name) as in the dart sdk but should be resolved
            entries.push(new AbiFunction(name, inputs));
        }
        return entries;
    }
    encodeFunction(name, args) {
        let f;
        this.entries.forEach(entry => {
            if (entry.name == name) {
                // ToDo: Forced cast (entry.inputs) as in the dart sdk but should be resolved
                f = new AbiFunction(entry.name, entry.inputs);
            }
        });
        return f.encode(args);
    }
}
exports.Abi = Abi;
var TypeEnum;
(function (TypeEnum) {
    TypeEnum[TypeEnum["function"] = 0] = "function";
})(TypeEnum || (TypeEnum = {}));
class Entry {
    constructor(name, inputs, type) {
        this.name = name;
        this.inputs = inputs;
        this.type = type;
    }
    formatSignature() {
        let paramTypes = "";
        // ToDo: Forced cast (this.inputs) as in the dart sdk but should be resolved
        for (let param of this.inputs) {
            paramTypes += param.type.getCanonicalName() + ",";
        }
        let x = paramTypes;
        if (x.endsWith(",")) {
            x = x.substring(0, x.length - 1);
        }
        return this.name + "(" + x + ")";
    }
    encodeSignature() {
        return this.fingerprintSignature();
    }
    fingerprintSignature() {
        let hash = new sha3_1.SHA3(256);
        hash.update(Buffer.from(this.formatSignature()));
        return hash.digest();
    }
    encodeArguments(args) {
        if (args.length > this.inputs.length)
            throw Error();
        let staticSize = 0;
        let dynamicCnt = 0;
        for (let i = 0; i < args.length; i++) {
            let type = this.inputs[i].type;
            if (type.isDynamicType()) {
                dynamicCnt++;
            }
            staticSize += type.getFixedSize();
        }
        let bb = [];
        for (let curDynamicPtr = staticSize, curDynamicCnt = 0, i = 0; i < args.length; i++) {
            let type = this.inputs[i].type;
            if (type.isDynamicType()) {
                let dynBB = type.encode(args[i]);
                bb[i] = abi_types_1.IntType.encodeInt(curDynamicPtr);
                bb[args.length + curDynamicCnt] = dynBB;
                curDynamicCnt++;
                curDynamicPtr += dynBB.length;
            }
            else {
                bb[i] = type.encode(args[i]);
            }
        }
        let x = Buffer.concat(bb);
        return x;
    }
}
exports.Entry = Entry;
class Param {
    constructor(name, type) {
        this.indexed = false;
        this.name = name;
        this.type = type;
    }
}
exports.Param = Param;
class AbiFunction extends Entry {
    constructor(name, inputs) {
        super(name, inputs, TypeEnum.function);
    }
    encode(args) {
        const s1 = this.encodeSignature();
        const l1 = super.encodeArguments(args);
        return Buffer.concat([s1, l1]);
    }
    extractSignature(data) {
        return data.slice(0, AbiFunction.encodedSignLength);
    }
    encodeSignature() {
        return this.extractSignature(super.encodeSignature());
    }
}
exports.AbiFunction = AbiFunction;
AbiFunction.encodedSignLength = 4;
