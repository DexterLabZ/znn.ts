import type {
  Configuration
} from 'webpack';

module.exports = {
  entry: {
    background: 'src/background.ts'
  },
  module: {
    // Makes WebPack think that we don't need to parse this module,
    // otherwise it tries to recompile it, but fails
    //
    // This fixes error: Module not found: Error: Can't resolve 'env'
    noParse: /\.wasm$/,
    rules: [{
      test: /\.wasm$/,
      // Tells WebPack that this module should be included as
      // base64-encoded binary file and not as code
      loader: 'base64-loader',
      // Disables WebPack's opinion where WebAssembly should be,
      // makes it think that it's not WebAssembly
      //
      // This fixes error: WebAssembly module is included in initial chunk.
      type: 'javascript/auto',
    }, ],
  }
} as Configuration;
