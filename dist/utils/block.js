"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockUtils = void 0;
const ethers_1 = require("ethers");
const plasma_1 = require("../model/embedded/plasma");
const account_block_template_1 = require("../model/nom/account_block_template");
const hash_1 = require("../model/primitives/hash");
const hash_height_1 = require("../model/primitives/hash_height");
const pow_1 = require("./../pow/pow");
const bytes_1 = require("./bytes");
class BlockUtils {
    static isSendBlock(blockType) {
        return [account_block_template_1.BlockTypeEnum.userSend, account_block_template_1.BlockTypeEnum.contractSend].includes(blockType);
    }
    static isReceiveBlock(blockType) {
        return [account_block_template_1.BlockTypeEnum.userReceive, account_block_template_1.BlockTypeEnum.genesisReceive, account_block_template_1.BlockTypeEnum.contractReceive].includes(blockType);
    }
    static async getTransactionHash(transaction) {
        const versionBytes = bytes_1.BytesUtils.longToBytes(transaction.version);
        const chainIdentifierBytes = bytes_1.BytesUtils.longToBytes(transaction.chainIdentifier);
        const blockTypeBytes = bytes_1.BytesUtils.longToBytes(transaction.blockType);
        const previousHashBytes = transaction.previousHash.getBytes();
        const heightBytes = bytes_1.BytesUtils.longToBytes(transaction.height);
        const momentumAcknowledgedBytes = transaction.momentumAcknowledged.getBytes();
        const addressBytes = transaction.address.getBytes();
        const toAddressBytes = transaction.toAddress.getBytes();
        // ToDo important: If amount is negative, the returned result is different from the DART SDK
        // It results (TS)
        // 255, 255, ... , 255, 232
        // Instead of (dart)
        // 0, 0, 0, 232
        const amountBytes = bytes_1.BytesUtils.numberOrStringToBytes(transaction.amount);
        const tokenStandardBytes = transaction.tokenStandard.getBytes();
        const fromBlockHashBytes = transaction.fromBlockHash.hash;
        const descendentBlocksBytes = (await hash_1.Hash.digest(Buffer.from([]))).getBytes();
        const dataBytes = (await hash_1.Hash.digest(transaction.data)).getBytes();
        const fusedPlasmaBytes = bytes_1.BytesUtils.longToBytes(transaction.fusedPlasma);
        const difficultyBytes = bytes_1.BytesUtils.longToBytes(transaction.difficulty);
        const nonceBytes = bytes_1.BytesUtils.leftPadBytes(Buffer.from(transaction.nonce, "hex"), 8);
        const source = Buffer.concat([
            versionBytes,
            chainIdentifierBytes,
            blockTypeBytes,
            previousHashBytes,
            heightBytes,
            momentumAcknowledgedBytes,
            addressBytes,
            toAddressBytes,
            amountBytes,
            tokenStandardBytes,
            fromBlockHashBytes,
            descendentBlocksBytes,
            dataBytes,
            fusedPlasmaBytes,
            difficultyBytes,
            nonceBytes,
        ]);
        // console.log("Buffer of hash", source);
        return hash_1.Hash.digest(source);
    }
    static async _getTransactionSignature(keyPair, transaction) {
        const sig = await keyPair.sign(transaction.hash.getBytes());
        return sig;
    }
    static async _getPoWData(transaction) {
        return await hash_1.Hash.digest(Buffer.concat([transaction.address.getBytes(), transaction.previousHash.getBytes()]));
    }
    static async _autofillTransactionParameters(zenonInstance, accountBlockTemplate) {
        let frontierAccountBlock = await zenonInstance.ledger.getFrontierBlock(accountBlockTemplate.address);
        let height = 1;
        let previousHash = hash_1.emptyHash;
        if (frontierAccountBlock != null) {
            height = frontierAccountBlock.height + 1;
            previousHash = frontierAccountBlock.hash;
        }
        accountBlockTemplate.height = height;
        accountBlockTemplate.previousHash = previousHash;
        let frontierMomentum = await zenonInstance.ledger.getFrontierMomentum();
        let momentumAcknowledged = new hash_height_1.HashHeight(frontierMomentum.hash, frontierMomentum.height);
        accountBlockTemplate.momentumAcknowledged = momentumAcknowledged;
        return accountBlockTemplate;
    }
    static async _checkAndSetFields(zenonInstance, transaction, currentKeyPair) {
        // const zenonInstance = Zenon.getSingleton();
        // console.log("_checkAndSetFields");
        transaction.address = (await currentKeyPair.getAddress());
        transaction.publicKey = await currentKeyPair.getPublicKey();
        await BlockUtils._autofillTransactionParameters(zenonInstance, transaction);
        if (BlockUtils.isSendBlock(transaction.blockType)) {
        }
        else {
            if (transaction.fromBlockHash == hash_1.emptyHash) {
                throw Error();
            }
            let sendBlock = await zenonInstance.ledger.getBlockByHash(transaction.fromBlockHash);
            if (sendBlock == null) {
                throw Error();
            }
            if (!(sendBlock.toAddress.toString() == transaction.address.toString())) {
                throw Error();
            }
            if (transaction.data.length > 0) {
                throw Error();
            }
        }
        if (transaction.difficulty > 0 && transaction.nonce == "") {
            throw Error();
        }
        return transaction;
    }
    static async _setDifficulty(zenonInstance, transaction, generatingPowCallback, waitForRequiredPlasma = false) {
        // console.log("_setDifficulty");
        let powParam = new plasma_1.GetRequiredParam(transaction.address, transaction.blockType, transaction.toAddress, transaction.data);
        let response = await zenonInstance.embedded.plasma.getRequiredPoWForAccountBlock(powParam);
        if (response.requiredDifficulty != 0) {
            transaction.fusedPlasma = response.availablePlasma;
            transaction.difficulty = response.requiredDifficulty;
            const powData = await BlockUtils._getPoWData(transaction);
            ethers_1.logger.info(`Generating Plasma for block: hash=${powData}`);
            if (generatingPowCallback)
                generatingPowCallback(pow_1.PowStatus.generating);
            transaction.nonce = (await (0, pow_1.generatePoW)(powData, transaction.difficulty)) + "";
            if (generatingPowCallback)
                generatingPowCallback(pow_1.PowStatus.done);
        }
        else {
            transaction.fusedPlasma = response.basePlasma;
            transaction.difficulty = 0;
            transaction.nonce = "0000000000000000";
        }
        return transaction;
    }
    static async _setHashAndSignature(transaction, currentKeyPair) {
        // console.log("_setHashAndSignature");
        transaction.hash = await BlockUtils.getTransactionHash(transaction);
        // console.log("getTransactionHash", transaction.hash);
        let transSig = await BlockUtils._getTransactionSignature(currentKeyPair, transaction);
        // console.log("_getTransactionSignature", transSig);
        transaction.signature = transSig;
        return transaction;
    }
    static async send(zenonInstance, transaction, currentKeyPair, generatingPowCallback, waitForRequiredPlasma = false) {
        // console.log("Send", transaction);
        transaction = await BlockUtils._checkAndSetFields(zenonInstance, transaction, currentKeyPair);
        transaction = await BlockUtils._setDifficulty(zenonInstance, transaction, generatingPowCallback, waitForRequiredPlasma);
        transaction = await BlockUtils._setHashAndSignature(transaction, currentKeyPair);
        // console.log("transaction before publish", transaction);
        await zenonInstance.ledger.publishRawTransaction(transaction);
        ethers_1.logger.info("Published account-block");
        return transaction;
    }
}
exports.BlockUtils = BlockUtils;
