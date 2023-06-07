import {StorageController} from "../utils/storageController";
import {KeyFile} from "./keyfile";
import {KeyStore} from "./keystore";
class SaveKeyStoreArguments {
  store: KeyStore;
  password: string;
  name: string;

  constructor(store: KeyStore, password: string, name: string) {
    this.store = store;
    this.password = password;
    this.name = name;
  }
}

export const DEFAULT_WALLET_PATH = "znn.ts-wallet";
export const DEFAULT_CHAINID_PATH = "znn.ts-chainId";

class KeyStoreManager {
  walletPath: string = DEFAULT_WALLET_PATH;
  keyStoreInUse?: KeyStore;

  async saveKeyStoreFunction(args: SaveKeyStoreArguments) {
    this.saveKeyStore(args.store, args.password, args.name);
  }

  async saveKeyStore(store: KeyStore, password: string, name?: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (name && typeof name == "string") {
        name = name.replace(" ", "-");
      } else {
        let keyPair = store.getKeyPair();
        let nameAdd = await keyPair.getAddress();
        name = nameAdd.toString();
      }
      let encryptedKeyFile = await KeyFile.encrypt(store, password);
      try {
        StorageController.addWalletAddress(this.walletPath, name, encryptedKeyFile);
        resolve(this.walletPath + name);
      } catch (e: any) {
        reject(e);
      }
    });
  }

  setKeyStore(keyStore: KeyStore) {
    this.keyStoreInUse = keyStore;
  }

  getMnemonicInUse(): string | undefined {
    if (!this.keyStoreInUse) {
      throw Error("The keystore is use is null");
    }
    return this.keyStoreInUse!.mnemonic;
  }

  listAllKeyStores(): any {
    let keyStoreList = StorageController.getWalletAddresses(DEFAULT_WALLET_PATH);
    return keyStoreList;
  }

  async readKeyStore(password: string, keyName: string): Promise<KeyStore> {
    let keyFile = StorageController.findWalletItem(DEFAULT_WALLET_PATH, keyName);
    if (!keyFile) {
      throw Error("Given keyFile does not exist");
    }

    try {
      let content = await keyFile.decrypt(password);
      let keyStore = new KeyStore().fromEntropy(content.toString());
      return keyStore;
    } catch (e: any) {
      throw Error(`Error decrypting ${e}`);
    }
  }

  async createNew(passphrase: string, name?: string): Promise<string> {
    let store = await KeyStore.newRandom();
    let keyStore = await this.saveKeyStore(store, passphrase, name);
    return keyStore;
  }
}

export {KeyStoreManager};
