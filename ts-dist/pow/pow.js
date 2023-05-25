"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePoW = exports.PowStatus = void 0;
const znn_pow_string_1 = require("./base/znn-pow-string");
const base64_1 = require("./base/base64");
var PowStatus;
(function (PowStatus) {
    PowStatus[PowStatus["generating"] = 0] = "generating";
    PowStatus[PowStatus["done"] = 1] = "done";
})(PowStatus = exports.PowStatus || (exports.PowStatus = {}));
function generatePoW(hash, difficulty) {
    return new Promise(async (resolve, reject) => {
        let worker;
        let workerDefinition = "";
        let blob;
        if (typeof window === "undefined" || window === null) {
            //
            // For node
            //
            try {
                const { Worker } = await Promise.resolve().then(() => __importStar(require("node:worker_threads")));
                // Node worker communication example
                // https://levelup.gitconnected.com/simple-bidirectional-messaging-in-node-js-worker-threads-7fe41de22e3c
                // workerDefinition += "var wasmPath = './node_modules/znn-ts-sdk/dist/7dba5723b45299486620.module.wasm';\n";
                workerDefinition += "var wasmPath = './node_modules/znn-ts-sdk/dist/src/pow/compiler/znn-pow-links.wasm';\n";
                workerDefinition += znn_pow_string_1.stringPow + "\n";
                workerDefinition += `
        const {
          Worker, parentPort
        } = require('node:worker_threads');
        
        var api = {};
        var isInitialized = false;
        const pow = Module;
      
        pow.onRuntimeInitialized = async (_) => {
          api = {
            benchmark: pow.cwrap('benchmark', 'string', ['string']),
            generatePoW: pow.cwrap('generatePoW', 'string', ['string', 'string']),
          };
      
          isInitialized = true;
          parentPort.postMessage({
            responseType: "initResolved"
          });
        }
        
        parentPort.onmessage = async function(e){
          switch(e.data.function){            
            case "initialize": {
              if(isInitialized){
                parentPort.postMessage({
                  responseType: "initResolved"
                });    
              } else {
                return;
              }
            }
            case "generatePoW": {
                try{
                  if (isInitialized) {
                      var resp = await api.generatePoW(e.data.hash, e.data.difficulty);
                      parentPort.postMessage({
                        responseType: "powResolved",
                        data: resp
                      });
                  }        
                  else{
                    parentPort.postMessage("PoW not initialized yet");
                    throw new Error("PoW not initialized yet")
                  }
                }
                catch(e){
                  parentPort.postMessage({
                    responseType: "error",
                    data: "e"
                  });
                  console.error(e);
                  return e;
                }
                return;
            }
            case "benchmarkPoW": {
                return;
            }
            default: {
                console.error("Invalid Worker message");
                return "Invalid Worker message";
            }
          }
      }`;
                await new Promise(async (resolve, reject) => {
                    require("fs").writeFile("generatedPowWorker.cjs", workerDefinition, function (err) {
                        if (err) {
                            console.error(err);
                            console.error("error creating file ^");
                            reject(err);
                        }
                        return resolve("error creating file");
                    });
                });
                worker = new Worker("./generatedPowWorker.cjs");
                worker.on("message", (e) => {
                    switch (e.responseType) {
                        case "initResolved": {
                            worker.postMessage({
                                function: "generatePoW",
                                hash: hash.toString(),
                                difficulty: difficulty.toString(),
                            });
                            return;
                        }
                        case "powResolved": {
                            return resolve(e.data);
                        }
                        case "error": {
                            console.error(e.data);
                            console.error("PoW error ^");
                            return reject(e.data);
                        }
                        default: {
                            console.error("Invalid Worker message");
                            return reject("Invalid Worker message");
                        }
                    }
                });
                worker.on("error", (event) => {
                    console.error(event);
                    console.error("There is an error PoW worker ^ !");
                    throw new Error(event);
                });
            }
            catch (err) {
                console.error("node support is disabled!");
            }
        }
        else {
            //
            // For browser
            //
            window.URL = window.URL || window.webkitURL;
            workerDefinition += "var wasmPath = '" + base64_1.base64Wasm + "';\n";
            workerDefinition += znn_pow_string_1.stringPow + "\n";
            workerDefinition += `
        var api = {};
        var isInitialized = false;
        const pow = Module;
      
        pow.onRuntimeInitialized = async (_) => {
          api = {
            benchmark: pow.cwrap('benchmark', 'string', ['string']),
            generatePoW: pow.cwrap('generatePoW', 'string', ['string', 'string']),
          };
      
          isInitialized = true;
          self.postMessage({
            responseType: "initResolved"
          });
        }
        
        self.onmessage = async function(e){
          switch(e.data.function){
            case "initialize": {
              if(isInitialized){
                self.postMessage({
                  responseType: "initResolved"
                });    
              } else {
                return;
              }
            }
            case "generatePoW": {
                try{
                  if (isInitialized) {
                      var resp = await api.generatePoW(e.data.hash, e.data.difficulty);
                      self.postMessage({
                        responseType: "powResolved",
                        data: resp
                      });
                  }        
                  else{
                    self.postMessage("PoW not initialized yet");
                    throw new Error("PoW not initialized yet")
                  }
                }
                catch(e){
                  self.postMessage({
                    responseType: "error",
                    data: "e"
                  });
                  console.error(e);
                  return e;
                }
                return;
            }
            case "benchmarkPoW": {
                return;
            }
            default: {
                console.error("Invalid Worker message");
                return "Invalid Worker message";
            }
          }
      }`;
            blob = new Blob([workerDefinition], { type: "application/javascript" });
            worker = new Worker(URL.createObjectURL(blob));
            worker.onmessage = function (e) {
                switch (e.data.responseType) {
                    case "initResolved": {
                        worker.postMessage({
                            function: "generatePoW",
                            hash: hash.toString(),
                            difficulty: difficulty.toString(),
                        });
                        return;
                    }
                    case "powResolved": {
                        return resolve(e.data.data);
                    }
                    case "error": {
                        console.error(e.data.data);
                        console.error("PoW error ^");
                        return reject(e.data.data);
                    }
                    default: {
                        console.error("Invalid Worker message");
                        return reject("Invalid Worker message");
                    }
                }
            };
            worker.onerror = function (event) {
                console.error(event);
                console.error("There is an error PoW worker ^ !");
                throw new Error(event);
            };
        }
    });
}
exports.generatePoW = generatePoW;
