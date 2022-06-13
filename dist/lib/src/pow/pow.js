"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePoW = exports.PowStatus = void 0;
const znn_pow_string_1 = require("./base/znn-pow-string");
const base64_1 = require("./base/base64");
var PowStatus;
(function (PowStatus) {
    PowStatus[PowStatus["generating"] = 0] = "generating";
    PowStatus[PowStatus["done"] = 1] = "done";
})(PowStatus = exports.PowStatus || (exports.PowStatus = {}));
let worker;
if (typeof window !== 'undefined') {
    window.URL = window.URL || window.webkitURL;
}
let workerDefinition = "";
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
function generatePoW(hash, difficulty) {
    return new Promise((resolve, reject) => {
        let blob = new Blob([workerDefinition], { type: 'application/javascript' });
        worker = new Worker(URL.createObjectURL(blob));
        worker.onmessage = function (e) {
            switch (e.data.responseType) {
                case "initResolved": {
                    worker.postMessage({
                        function: 'generatePoW',
                        hash: hash.toString(),
                        difficulty: difficulty.toString()
                    });
                    return;
                }
                case "powResolved": {
                    return resolve(e.data.data);
                }
                case "error": {
                    console.error('PoW error: ' + e.data.data);
                    return reject(e.data.data);
                }
                default: {
                    console.error("Invalid Worker message");
                    return reject("Invalid Worker message");
                }
            }
        };
        worker.onerror = function (event) {
            console.error('There is an error PoW worker!', event);
            throw new Error(event);
        };
    });
}
exports.generatePoW = generatePoW;
