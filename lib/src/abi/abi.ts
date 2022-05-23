import { SHA3 } from "sha3";
import { AbiType, IntType } from "./abi_types";
export class Abi{
  entries: Array<Entry>;

  constructor(entries: Array<Entry>){
    this.entries = entries;
  }

  static fromJson(j: any) {
    return new Abi(Abi._parseEntries(j));
  } 

  static _parseEntries(j: any): Array<Entry> {
      let entries = new Array<Entry>();

      j = JSON.parse(j);
      for(let json of j){
        let name: string;
        let inputs = new Array<Param>();

        name = json["name"];
        if(json["type"] != "function"){
          throw new Error("Invalid ABI entry type: " + json["type"]);
        }
        if(json["inputs"] != null){
          for(let input of json["inputs"]){
            inputs.push(new Param(input["name"], AbiType.getType(input["type"])));
          }
        }
        // ToDo: Forced cast (name) as in the dart sdk but should be resolved
        entries.push(new AbiFunction(name!, inputs));
      }
      return entries;
  }

  encodeFunction(name: string, args: any){
    let f: AbiFunction;
    this.entries.forEach(entry => {
      if(entry.name == name){
        // ToDo: Forced cast (entry.inputs) as in the dart sdk but should be resolved
        f = new AbiFunction(entry.name, entry.inputs!);
      }
    });
    return f!.encode(args);
  }
}

enum TypeEnum { function }

export class Entry{
  name?: string;
  inputs?: Array<Param>;
  type?: TypeEnum;

  constructor(name?: string, inputs?: Array<Param>, type?: TypeEnum){
    this.name = name;
    this.inputs = inputs;
    this.type = type;
  }

  formatSignature(): string{
    let paramTypes = "";
    // ToDo: Forced cast (this.inputs) as in the dart sdk but should be resolved
    for(let param of this.inputs!){
      paramTypes += param.type.getCanonicalName()! + ",";
    }

    let x = paramTypes;
    if(x.endsWith(",")){
      x = x.substring(0, x.length - 1);
    }

    return this.name + "(" + x + ")";
  }

  encodeSignature(): Buffer{
    return this.fingerprintSignature();
  }

  fingerprintSignature(): Buffer{
    let hash = new SHA3(256);
    hash.update(Buffer.from(this.formatSignature()));
    return hash.digest();
  }

  encodeArguments(args: any): Buffer{
    if (args.length > this.inputs!.length) throw Error();
    let staticSize = 0;
    let dynamicCnt = 0;
    for (let i = 0; i < args.length; i++) {
      let type = this.inputs![i].type;
      if (type.isDynamicType()) {
        dynamicCnt++;
      }
      staticSize += type.getFixedSize()!;
    }

    let bb: Array<Buffer> = [];

    for (let curDynamicPtr = staticSize, curDynamicCnt = 0, i = 0;
        i < args.length;
        i++) {
      let type = this.inputs![i].type;
      if (type.isDynamicType()) {
        let dynBB = type.encode(args[i]); 
        bb[i] = IntType.encodeInt(curDynamicPtr);
        bb[args.length + curDynamicCnt] = dynBB;
        curDynamicCnt++;
        curDynamicPtr += dynBB.length;
      } else {
        bb[i] = type.encode(args[i]);
      }
    }
    let x = Buffer.concat(bb);
    return x;
  }
  
}

export class Param{
  indexed: boolean = false;
  name?: string;
  type: AbiType;

  constructor(name: string, type: AbiType){
    this.name = name;
    this.type = type;
  }
}

export class AbiFunction extends Entry{
  static encodedSignLength: number = 4;

  constructor(name: string, inputs: Array<Param>){
    super(name, inputs, TypeEnum.function);
  }

  encode(args: any){
    const s1 = this.encodeSignature();
    const l1 = super.encodeArguments(args);
    return Buffer.concat([s1, l1]);
  }

  extractSignature(data: Buffer){
    return data.slice(0, AbiFunction.encodedSignLength);
  }

  encodeSignature(): Buffer {
      return this.extractSignature(super.encodeSignature());
  }
}