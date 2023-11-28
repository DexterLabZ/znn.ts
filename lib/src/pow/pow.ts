import {Hash} from "../model/primitives/hash";
import {stringPow} from "./base/znn-pow-string";
import {base64Wasm} from "./base/base64";

export enum PowStatus {
  generating = 0,
  done = 1,
}

export function generatePoW(hash: Hash, difficulty: number) {
  return new Promise(async (resolve, reject) => {
    let worker: any;
    let workerDefinition = "";
    let blob: any;

    if (typeof window === "undefined" || window === null) {
      //
      // For node
      //
      try {
        const {Worker} = await import("node:worker_threads");

        // Node worker communication example
        // https://levelup.gitconnected.com/simple-bidirectional-messaging-in-node-js-worker-threads-7fe41de22e3c

        // workerDefinition += "var wasmPath = './node_modules/znn-ts-sdk/dist/7dba5723b45299486620.module.wasm';\n";
        workerDefinition +=
          "var wasmPath = './node_modules/znn-ts-sdk/dist/lib/src/pow/compiler/znn-pow-links.wasm';\n";
        workerDefinition += stringPow + "\n";
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
        console.log("workerDefinition", workerDefinition);

        await new Promise(async (resolve, reject) => {
          require("fs").writeFile("generatedPowWorker.cjs", workerDefinition, function (err: any) {
            if (err) {
              console.error(err);
              console.error("error creating file ^");
              reject(err);
            }
            return resolve("error creating file");
          });
        });
        worker = new Worker("./generatedPowWorker.cjs");

        worker.on("message", (e: any) => {
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

        worker.on("error", (event: string | undefined) => {
          console.error(event);
          console.error("There is an error PoW worker ^ !");
          throw new Error(event);
        });
      } catch (err) {
        console.error("node support is disabled!");
      }
    } else {
      //
      // For browser
      //
      window.URL = window.URL || window.webkitURL;

      workerDefinition += "var wasmPath = '" + base64Wasm + "';\n";
      workerDefinition += stringPow + "\n";
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
      console.log("workerDefinition", workerDefinition);

      blob = new Blob([workerDefinition], {type: "application/javascript"});
      worker = new Worker(URL.createObjectURL(blob));

      worker.onmessage = function (e: {data: any}) {
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

      worker.onerror = function (event: string | undefined) {
        console.error(event);
        console.error("There is an error PoW worker ^ !");
        throw new Error(event);
      };
    }
  });
}
