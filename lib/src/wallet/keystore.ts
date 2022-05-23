import { wordlist } from '@scure/bip39/wordlists/english';
import {
	mnemonicToEntropy,
	entropyToMnemonic,
	validateMnemonic,
	mnemonicToSeedSync
} from '@scure/bip39';


import {
	ethers
} from "ethers";

import {
	KeyPair
} from "./keypair";
import {
	Derivation
} from "./derivation";
import {
	Crypto
} from "./../crypto/crypto";
class KeyStore {
	mnemonic ? : string;
	entropy ? : string;
	seed ? : string;

	constructor() {
		return this;
	}

	public fromMnemonic(mnemonic: string): KeyStore {
		this.setMnemonic(mnemonic);
		return this;
	}

	public fromSeed(seed: string): KeyStore {
		this.setSeed(seed);
		return this;
	}

	public fromEntropy(entropy: string): KeyStore {
		this.setEntropy(entropy);
		return this;
	}

	static async newRandom(): Promise < KeyStore > {
		return new Promise((resolve, reject) => {
				try {
					let entropy = Buffer.from(ethers.utils.randomBytes(32));
					resolve(new KeyStore().fromEntropy(entropy.toString('hex')));
				} catch (e: any) {
					reject(e);
					throw Error(e.toString());
				}
			});
		}

		setMnemonic(mnemonic: string): void {
			if (!validateMnemonic(mnemonic, wordlist)) {
				throw Error("Invalid mnemonic !");
			}
			this.mnemonic = mnemonic;
			this.entropy = Buffer.from(mnemonicToEntropy(this.mnemonic, wordlist)).toString('hex');
			this.seed = Buffer.from(mnemonicToSeedSync(this.mnemonic)).toString('hex');
		}

		setSeed(seed: string): void {
			this.seed = seed;
		}

		setEntropy(entropy: string): void {
			this.setMnemonic(entropyToMnemonic(new Uint8Array(Buffer.from(entropy, 'hex')), wordlist));
		}

		getKeyPair(index: number = 0): KeyPair {
			const derivationAccount = Derivation.getDerivationAccount(index);
			const derivedKey = Crypto.deriveKey(derivationAccount, this.seed!);
			return new KeyPair(derivedKey);
		}
	}

	export {
		KeyStore
	};