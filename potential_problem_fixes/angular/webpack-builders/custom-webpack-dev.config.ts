import { ProvidePlugin } from 'webpack';
import type { Configuration } from 'webpack';
const ExtensionReloader = require('webpack-ext-reloader');
const config = require('./custom-webpack.config');

module.exports = {
  ...config,
  mode: 'development',
  plugins: [
    new ExtensionReloader({
      reloadPage: true, // Force the reload of the page also
      entries: { // The entries used for the content/background scripts or extension pages
        background: 'background',
      }
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  module: {
    // Makes WebPack think that we don't need to parse this module,
    // otherwise it tries to recompile it, but fails
    //
    // Error: Module not found: Error: Can't resolve 'env'
    noParse: /\.wasm$/,
    rules: [{
      test: /\.wasm$/,
      // Tells WebPack that this module should be included as
      // base64-encoded binary file and not as code
      loader: 'base64-loader',
      // Disables WebPack's opinion where WebAssembly should be,
      // makes it think that it's not WebAssembly
      //
      // Error: WebAssembly module is included in initial chunk.
      type: 'javascript/auto',
    }, ],
  },
  resolve: {
    fallback: {
        fs: false,
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer')
    },
  },
} as Configuration;
