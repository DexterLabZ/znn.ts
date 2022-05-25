import {Hash} from '../model/primitives/hash';
import {stringPow} from './base/znn-pow-string';
import {base64Wasm} from './base/base64';

export enum PowStatus {
  generating = 0,
  done = 1
}

let worker: any;

if (typeof window !== 'undefined') {
  window.URL = window.URL || window.webkitURL;
}

let workerDefinition = "";
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


export function generatePoW(hash: Hash, difficulty: number) {
  return new Promise((resolve, reject) => {

    let blob = new Blob([workerDefinition], {type: 'application/javascript'});
    worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = function(e: { data: any; }) {
      switch(e.data.responseType){
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
        case "error":{
          console.error('PoW error: ' + e.data.data);
          return reject(e.data.data);
        }
        default: {
          console.error("Invalid Worker message");
          return reject("Invalid Worker message");
        }
      }
    };

    worker.onerror = function(event: string | undefined) {
      console.error('There is an error PoW worker!', event);
      throw new Error(event);
    }

  });
}
