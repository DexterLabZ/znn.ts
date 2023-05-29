import {StorageController} from "./utils/storageController";
import {DEFAULT_CHAINID_PATH} from "./wallet/manager";

export class ZnnSdkException {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  toString(): string {
    if (this.message == null) return "Zenon SDK Exception";
    return "Zenon SDK Exception: " + this.message;
  }
}

export const netId = 1; // Alphanet
// Alphanet chain identifier as defined in the Genesis configuration file
// Alphanet network identifier is initialized with the chain identifier
// https://github.com/zenon-network/go-zenon/blob/b2e6a98fa154d763571bb7af6b1c685d0d82497d/zenon/zenon.go#L41

export const defaultChainId = 1; // Alphanet
let chainId = defaultChainId;

export const setChainIdentifier = (chainIdentifier: number = defaultChainId) => {
  StorageController.setItem(DEFAULT_CHAINID_PATH, chainIdentifier.toString());
  chainId = chainIdentifier;
};

export const getChainIdentifier = () => {
  const storedChainId = StorageController.getItem(DEFAULT_CHAINID_PATH);

  if (storedChainId && parseFloat(storedChainId) !== chainId) {
    chainId = parseFloat(storedChainId);
  } else {
    StorageController.setItem(DEFAULT_CHAINID_PATH, chainId.toString());
  }
  return chainId;
};
