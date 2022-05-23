const wasm2js = require('wasm2js');
const fs = require('fs');

export function compileWasm(){
  const wasmBuffer = fs.readFileSync('../example/znn-pow-links.wasm');
  const js = wasm2js(wasmBuffer);
  
  return js;
}