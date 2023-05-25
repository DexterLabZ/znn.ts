import { KeyPair } from "./keypair";
declare class KeyStore {
    mnemonic?: string;
    entropy?: string;
    seed?: string;
    constructor();
    fromMnemonic(mnemonic: string): KeyStore;
    fromSeed(seed: string): KeyStore;
    fromEntropy(entropy: string): KeyStore;
    static newRandom(): Promise<KeyStore>;
    setMnemonic(mnemonic: string): void;
    setSeed(seed: string): void;
    setEntropy(entropy: string): void;
    getKeyPair(index?: number): KeyPair;
}
export { KeyStore };
