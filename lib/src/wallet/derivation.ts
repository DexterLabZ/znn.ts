/// BIP44 https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
///
/// m / purpose' / coin_type' / account' / change / address_index
class Derivation {
  static coinType: string = '73404';
  static derivationPath: string = `m/44'/${this.coinType}'`;

  static getDerivationAccount(account: number = 0): string {
    return Derivation.derivationPath + `/${account}'`;
  }
}

export {
  Derivation
};