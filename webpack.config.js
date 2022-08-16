const path = require('path');
const webpack = require('webpack');

const generalConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Makes WebPack think that we don't need to parse this module,
        // otherwise it tries to recompile it, but fails
        //
        // Error: Module not found: Error: Can't resolve 'env'
        test: /\.wasm$/,
        // Tells WebPack that this module should be included as
        // base64-encoded binary file and not as code
        loader: 'base64-loader',
        // Disables WebPack's opinion where WebAssembly should be,
        // makes it think that it's not WebAssembly
        //
        // Error: WebAssembly module is included in initial chunk.
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.node.js',
    libraryTarget: 'commonjs',
  },
  entry: {
    app: './index.ts',
  },
  externals: {
    // You can use `false` or other values if you need something strange here,example will output `module.exports = {};`
    "argon2-browser": "{}",
    "argon2": "argon2",
    "crypto-browserify": "{}",
    "browserify-sign": "{}"
  },
  experiments: {
    asyncWebAssembly: true,
  }
};

const clientConfig = {
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    chunkFormat: 'module',
    libraryTarget: 'commonjs',
  },
  entry: {
    app: './index.ts',
  },
  externals: {
    // You can use `false` or other values if you need something strange here,example will output `module.exports = {};`
   "node:crypto": "crypto-browserify",
   "fs": "crypto-browserify",
   "a": "crypto-browserify",
   "node:worker_threads": "crypto-browserify",
   "node:url": "crypto-browserify",
   "node:crypto": "crypto-browserify",
   "assert": "crypto-browserify",
   "constants": "crypto-browserify",
   "argon2": "crypto-browserify"
  },
  experiments: {
    asyncWebAssembly: true,
    outputModule: true
  },
  plugins:[
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ]
};

Object.assign(serverConfig, generalConfig);
Object.assign(clientConfig, generalConfig);

module.exports = [serverConfig, clientConfig];
