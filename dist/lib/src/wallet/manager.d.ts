import { KeyStore } from "./keystore";
declare class SaveKeyStoreArguments {
    store: KeyStore;
    password: string;
    name: string;
    constructor(store: KeyStore, password: string, name: string);
}
declare class KeyStoreManager {
    walletPath: string;
    keyStoreInUse?: KeyStore;
    saveKeyStoreFunction(args: SaveKeyStoreArguments): Promise<void>;
    saveKeyStore(store: KeyStore, password: string, name?: string): Promise<string>;
    setKeyStore(keyStore: KeyStore): void;
    getMnemonicInUse(): string | undefined;
    listAllKeyStores(): any;
    readKeyStore(password: string, keyName: string): Promise<KeyStore>;
    createNew(passphrase: string, name?: string): Promise<string>;
}
export { KeyStoreManager };
