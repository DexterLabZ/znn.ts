"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Derivation = void 0;
/// BIP44 https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
///
/// m / purpose' / coin_type' / account' / change / address_index
class Derivation {
    static getDerivationAccount(account = 0) {
        return Derivation.derivationPath + `/${account}'`;
    }
}
exports.Derivation = Derivation;
_a = Derivation;
Derivation.coinType = '73404';
Derivation.derivationPath = `m/44'/${_a.coinType}'`;
