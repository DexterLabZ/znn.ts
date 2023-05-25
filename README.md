# znn-ts-sdk

Official RPC documentation:

https://wiki.zenon.network/#!api.md


```
npm install github:dexter703/znn-ts-sdk
```

Compatible with Typescript 4.5, ES2020, Webpack 5, Angular 13, React 17

### Importing sdk. Check [here](#common-issues-when-installing-package-to-your-project) for common issues

For browser env:
```
import {
  KeyStore,
  KeyStoreManager,
  Zenon,
  Constants,
  Primitives
} from 'znn-ts-sdk';
```

For server env (nodeJS):
```
import znn from 'znn-ts-sdk/dist/index.node.js';
const {KeyStore, KeyStoreManager, Zenon, Primitives, Constants} = znn;
```

### Importing other models and constants
```
import {
  Primitives,
  Constants
} from 'znn-ts-sdk';

const { 
  Address,
  Hash,
  GetRequiredParam,
  AccountBlockTemplate,
  TokenStandard,
} = Primitives;

const {
  pillarAddress,
  plasmaAddress,
  stakeAddress,
  znnTokenStandard,
  qsrTokenStandard,
  emptyTokenStandard,
  znnZts,
  qsrZts,
  emptyZts,
} = Constants
```

### Initializing client and connecting to a server
```
const zenon = Zenon.getSingleton();
zenon.initialize(this.zenon.defaultServerUrl);
```

### Generating address from scratch with a wallet name and password (for storage purposes)
```
try{
  const keyManager: KeyStoreManager = new KeyStoreManager();
  await keyManager.createNew("pass", "name");
  const keyStore: KeyStore = await keyManager.readKeyStore("pass", "name");
  const generatedMnemonic: string = keyStore['mnemonic']!;
  const keyPair: KeyPair = keyStore.getKeyPair(0);
  const address: Address = await keyPair.getAddress();
  const readableAddress: string = address.toString();
}
catch (err) { 
  console.error(err);
}    
``` 
### Importing an address from mnemonic
```
try{
  const mnemonic =
    'route become dream access impulse price inform obtain engage ski believe awful absent pig thing vibrant possible exotic flee pepper marble rural fire fancy';

  const keyStore = new KeyStore().fromMnemonic(mnemonic);

  const keyPair:KeyPair = keyStore.getKeyPair(0);

  const privateKey: Buffer = keyPair.getPrivateKey();
  console.log("private key", privateKey.toString('hex'));

  const entropy: string|undefined = keyStore.entropy;
  console.log("entropy", entropy);

  const publicKey:Buffer = await keyPair.getPublicKey();
  console.log("public key:", publicKey.toString('hex'));

  const address: Address = await keyPair.getAddress();
  console.log("address:", address.toString());
  console.log("core bytes:", address.core.toString('hex'));
}
catch (err) { 
  console.error(err);
}
```


### Sending a transaction
```
// Having 8 decimals will mean that
// 1 ZNN = 100000000

const addressToSend: Address = Address.parse("z1qqjnwjjpnue8xmmpanz6csze6tcmtzzdtfsww7");
const AccountBlockTemplateSend:AccountBlockTemplate = AccountBlockTemplate.send(addressToSend, Constants.znnZts, 10000000000);
await zenon.send(AccountBlockTemplateSend, currentKeyPair);
```

### Receiving a transaction
```
const addressToReceiveTo: Address = Address.parse("z1qqjnwjjpnue8xmmpanz6csze6tcmtzzdtfsww7");
const startingPage = 0 ;
const pageSize = 10;

const getUnreceivedBlocksByAddress:AccountBlockList = await this.zenon.ledger.getUnreceivedBlocksByAddress(addressToReceiveTo, startingPage, pageSize);

if(getUnreceivedBlocksByAddress.count! > 0){
  let AccountBlockTemplateReceive:AccountBlockTemplate = AccountBlockTemplate.receive(getUnreceivedBlocksByAddress!.list![0]!.hash!);
}
```

### Ledger examples
```
const addressObject = Address.parse("z1qqjnwjjpnue8xmmpanz6csze6tcmtzzdtfsww7");
const rpcMaxPageSize: number = 1024;
const memoryPoolPageSize: number = 50;

const getUnconfirmedBlocksByAddress: AccountBlockList = await this.zenon.ledger.getUnconfirmedBlocksByAddress(addressObject, 0, memoryPoolPageSize);
console.log("ledger.getUnconfirmedBlocksByAddress", getUnconfirmedBlocksByAddress);

const getUnreceivedBlocksByAddress: AccountBlockList = await this.zenon.ledger.getUnreceivedBlocksByAddress(addressObject, 0, memoryPoolPageSize);
console.log("ledger.getUnreceivedBlocksByAddress", getUnreceivedBlocksByAddress);

const getFrontierBlock = await this.zenon.ledger.getFrontierBlock(addressObject);
console.log("ledger.getFrontierBlock", getFrontierBlock);

const getBlockByHash = await this.zenon.ledger.getBlockByHash(getFrontierBlock?.hash);
console.log("ledger.getBlockByHash", getBlockByHash);

const getBlocksByHeight = await this.zenon.ledger.getBlocksByHeight(addressObject, 1, rpcMaxPageSize);
console.log("ledger.getBlocksByHeight", getBlocksByHeight);

const getBlocksByPage = await this.zenon.ledger.getBlocksByPage(addressObject, 0, rpcMaxPageSize);
console.log("ledger.getBlocksByPage", getBlocksByPage);

const getFrontierMomentum = await this.zenon.ledger.getFrontierMomentum();
console.log("ledger.getFrontierMomentum", getFrontierMomentum);

const getMomentumBeforeTime = await this.zenon.ledger.getMomentumBeforeTime(getFrontierMomentum.timestamp);
console.log("ledger.getMomentumBeforeTime", getMomentumBeforeTime);

const getMomentumByHash = await this.zenon.ledger.getMomentumByHash(getFrontierMomentum.hash);
console.log("ledger.getMomentumByHash", getMomentumByHash);

const getMomentumsByHeight = await this.zenon.ledger.getMomentumsByHeight(getFrontierMomentum.height, rpcMaxPageSize);
console.log("ledger.getMomentumsByHeight", getMomentumsByHeight);

const getMomentumsByPage = await this.zenon.ledger.getMomentumsByPage(0, rpcMaxPageSize);
console.log("ledger.getMomentumsByPage", getMomentumsByPage);

const getDetailedMomentumsByHeight = await this.zenon.ledger.getDetailedMomentumsByHeight(getFrontierMomentum.height, rpcMaxPageSize);
console.log("ledger.getDetailedMomentumsByHeight", getDetailedMomentumsByHeight);

const getAccountInfoByAddress = await this.zenon.ledger.getAccountInfoByAddress(addressObject);
console.log("ledger.getAccountInfoByAddress", getAccountInfoByAddress);
```
### Pillar examples
```
const addressObject = Address.parse("z1qqjnwjjpnue8xmmpanz6csze6tcmtzzdtfsww7");
const rpcMaxPageSize: number = 1024;
const memoryPoolPageSize: number = 50;

const getDepositedQsr = await this.zenon.embedded.pillar.getDepositedQsr(addressObject);
console.log("pillar.getDepositedQsr", getDepositedQsr);

const getUncollectedReward = await this.zenon.embedded.pillar.getUncollectedReward(addressObject);
console.log("pillar.getUncollectedReward", getUncollectedReward);

const getFrontierRewardByPage = await this.zenon.embedded.pillar.getFrontierRewardByPage(addressObject, 0, rpcMaxPageSize);
console.log("pillar.getFrontierRewardByPage", getFrontierRewardByPage);

const getQsrRegistrationCost = await this.zenon.embedded.pillar.getQsrRegistrationCost();
console.log("pillar.getQsrRegistrationCost", getQsrRegistrationCost);

const getAll = await this.zenon.embedded.pillar.getAll(0, rpcMaxPageSize);
console.log("pillar.getAll", getAll.list[0]);
console.log("pillar.getAll", new Address(getAll.list[0].ownerAddress.hrp, getAll.list[0].ownerAddress.core).toString());

const getByOwner = await this.zenon.embedded.pillar.getByOwner(addressObject);
console.log("pillar.getByOwner", getByOwner);

const getByName = await this.zenon.embedded.pillar.getByName("pillarName");
console.log("pillar.getByName", getByName);

const checkNameAvailability = await this.zenon.embedded.pillar.checkNameAvailability("pillarName");
console.log("pillar.checkNameAvailability", checkNameAvailability);

const getDelegatedPillar = await this.zenon.embedded.pillar.getDelegatedPillar(addressObject);
console.log("pillar.getDelegatedPillar", getDelegatedPillar);

const getPillarsHistoryByEpoch = await this.zenon.embedded.pillar.getPillarsHistoryByEpoch(1, 0, rpcMaxPageSize);
console.log("pillar.getPillarsHistoryByEpoch", getPillarsHistoryByEpoch);
```

### Plasma examples
```
const getPlasma = await this.zenon.embedded.plasma.get(addressObject);
console.log("plasma.getPlasma", getPlasma);

const getEntriesByAddress = await this.zenon.embedded.plasma.getEntriesByAddress(addressObject);
console.log("plasma.getEntriesByAddress", getEntriesByAddress);

const getRequiredFusionAmount = await this.zenon.embedded.plasma.getRequiredFusionAmount(1);
console.log("plasma.getRequiredFusionAmount", getRequiredFusionAmount);

// Fuse
const fusePlasmaCall = await this.zenon.embedded.plasma.fuse(myAddress, 3600000000);
console.log("fusePlasmaCall:" , fusePlasmaCall);
console.log(await this.zenon.send(fusePlasmaCall, currentKeyPair));

// Cancel fuse
for(const fusEntry of getEntriesByAddress.list){
  const cancelPlasmaCall = await this.zenon.embedded.plasma.cancel(fusEntry.id);
  console.log("cancelPlasmaCall: ", fusEntry.id, cancelPlasmaCall);
  console.log(await this.zenon.send(cancelPlasmaCall, currentKeyPair));
}
```

### Token examples
```
const getAll = await this.zenon.embedded.token.getAll(0, rpcMaxPageSize);
console.log("token.getAll", getAll);
console.log("myToken", getAll["list"][4].owner.toString());
console.log("owner", getAll["list"][4].tokenStandard.toString());

const tokenOwner = getAll.list[0].owner;
const getByOwner = await this.zenon.embedded.token.getByOwner(tokenOwner, 0, rpcMaxPageSize);
console.log("token.getByOwner", getByOwner); 

const tokenStandard = getByOwner.list[0].tokenStandard;
const getByZts = await this.zenon.embedded.token.getByZts(tokenStandard);
console.log("token.getByZts", getByZts); 

// IssueToken
const issueTokenCall = await this.zenon.embedded.token.issueToken("testToken", "TSTKN", "website.com", 1, 1000000000, 0, true, true, true);
console.log("ISSUE issueTokenCall:" ,issueTokenCall);
console.log(this.zenon.send(issueTokenCall, currentKeyPair));

// Mint
const encodedCall = await this.zenon.embedded.token.mint(tokenStandard, 1, myAddress);
console.log("MINT encodedCall:" ,encodedCall);
console.log(this.zenon.send(encodedCall, currentKeyPair));

// Burn
const burnEncodedCall = await this.zenon.embedded.token.burnToken(tokenStandard, 1);
console.log("burn burnEncodedCall:" , burnEncodedCall);
console.log(await this.zenon.send(burnEncodedCall, currentKeyPair));

// Update
const updateEncodedCall = await this.zenon.embedded.token.updateToken(tokenStandard, myAddress, true, true);
console.log("update updateEncodedCall:" , updateEncodedCall);
console.log(await this.zenon.send(updateEncodedCall, currentKeyPair));
```

### Staking examples
```
const getEntriesByAddress = await this.zenon.embedded.stake.getEntriesByAddress(addressObject, 0, rpcMaxPageSize);
console.log("stake.getEntriesByAddress", getEntriesByAddress);

const getUncollectedReward = await this.zenon.embedded.stake.getUncollectedReward(addressObject);
console.log("stake.getUncollectedReward", getUncollectedReward);

const getFrontierRewardByPage = await this.zenon.embedded.stake.getFrontierRewardByPage(addressObject, 0, rpcMaxPageSize);
console.log("stake.getFrontierRewardByPage", getFrontierRewardByPage);
```
## Common issues when installing package to your project

1. Having issues with "crypto" or "stream" modules because of incompatibilities between server(node) and browser?
> https://stackoverflow.com/questions/52530289/module-not-found-error-cant-resolve-crypto-in-opt-lampp-htdocs-angular-te


2. Having issues with argon2 and webpack?
> https://github.com/antelle/argon2-browser/issues/26 <br/>
> https://github.com/antelle/argon2-browser/blob/master/examples/webpack/webpack.config.js<br/>
> More specific: <br/>
> https://github.com/antelle/argon2-browser/issues/26#issuecomment-525700240 <br/>


3. Potential problem: `Error: /src/wallet/manager.js 29:21
Module parse failed: Unexpected token (29:21)
File was processed with these loaders:
  ./node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js
  ./node_modules/@ngtools/webpack/src/ivy/index.js
  ./node_modules/source-map-loader/dist/cjs.js
You may need an additional loader to handle the result of these loaders.`
>   Angular Solution:<br />
>   Info here: https://github.com/angular/angular-cli/issues/20471
> 
>   3.1. Go to angular.json <br />
>   3.2. Use the custom-webpack files from [webpack-builders](./potential_problem_fixes/Angular/webpack-builders) and add them in the root folder <br /> 
>   3.4. Install angular-builders/custom-webpack <br /> 
>   ```
>   npm i -D @angular-builders/custom-webpack
>   npm i -D base64-loader
>   ```
>   3.5. Replace current builder from angular.json like following
>   ```
>   "projects":
>     {"project-name":{
>       architect:{
>         build:{          
>         "builder": "@angular-builders/custom-webpack:browser",
>         "options": {
>           "customWebpackConfig": {
>             "path": "./custom-webpack.config.ts"
>           },
>         [...] 
>         }
>       }
>     }
>   }
>   ```
>   3.6. Add webpack
>   ```
>   npm i webpack@5
>   ```

4. Potential error: `Error: Module not found: Error: Can't resolve 'fs' in 'D:\Projects\zenon\ts-sdk-1\examples\dist\node_modules\argon2-browser\dist'`
> Solution: Add this to package.json 
> ```
> "browser": {
>   "fs": false
> }
> ```

5. Potential error: `Uncaught ReferenceError: Buffer is not defined at Function.parse (main.js:1:384593)`

> Solution steps:
>   5.1 
>   ```
>   npm i buffer
>   ```
> 
>   5.2 Add this to the bottom of polyfill.ts
>   ```
>   (window as any).global = window;
>   global.Buffer = global.Buffer || require('buffer').Buffer;
>   (window as any).process = {
>     version: ''
>   };
>   ```


6. Potential error: `main.js:1 Uncaught TypeError: Cannot convert a BigInt value to a number`

> Solution:
> ```
> Upgrade tsconfig.json to use 
> "target": "es2020",
> "module": "es2020"
> ```

7. Potentialerror `Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self' 'wasm-eval'".`

> Solution:
> https://stackoverflow.com/questions/48047150/chrome-extension-compiled-by-webpack-throws-unsafe-eval-error <br/>
> ```
> Add
> devtool: 'cheap-module-source-map',
> to the root of your webpack.config.js
> ```


## Internal issues

1. `Error: Error decrypting TypeError: Cannot read properties of undefined (reading 'call') at KeyStoreManager.readKeyStore (manager.js:71:1)`

> Solution: 
> modifying cipher-base package in index.js
> Replace
> `
> var Transform = require('stream').Transform
> `
> with
> ```
> var Transform = require('readable-stream').Transform // replacing instead of "stream"
> ```
