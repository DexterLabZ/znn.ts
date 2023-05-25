"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytesUtils = void 0;
const ethers_1 = require("ethers");
class BytesUtils {
    static encodeBigInt(number) {
        return Buffer.from(number.toString());
    }
    static arraycopy(src, startPos, dest, destPos, len) {
        for (let i = 0; i < len; i++) {
            dest[destPos + i] = src[startPos + i];
        }
        return dest;
    }
    static bytesToBase64(bytes) {
        return bytes.toString("base64");
    }
    static bytesToHex(bytes) {
        const byteToHex = [];
        for (let n = 0; n <= 0xff; ++n) {
            const hexOctet = n.toString(16).padStart(2, "0");
            byteToHex.push(hexOctet);
        }
        const buff = new Uint8Array(bytes);
        const hexOctets = Array(buff.length);
        for (let i = 0; i < buff.length; ++i) {
            hexOctets[i] = byteToHex[buff[i]];
        }
        return hexOctets.join("");
    }
    static hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }
    static leftPadBytes(bytes, size) {
        if (bytes.length >= size) {
            return bytes;
        }
        let result = Buffer.alloc(size).fill(0);
        result = BytesUtils.arraycopy(bytes, 0, result, size - bytes.length, bytes.length);
        return result;
    }
    static longToBytes(longValue) {
        let byteArray = Buffer.alloc(8);
        for (let index = 0; index < byteArray.length; index++) {
            let byte = longValue & 0xff;
            byteArray[index] = byte;
            longValue = (longValue - byte) / 256;
        }
        return Buffer.from(byteArray.reverse());
    }
    static bigIntToBytes(b, numBytes) {
        let bb = Buffer.from([]).fill(0);
        let biBytes = BytesUtils.encodeBigInt(b);
        let start = biBytes.length == numBytes + 1 ? 1 : 0;
        let length = biBytes.length > numBytes ? biBytes.length : numBytes;
        BytesUtils.arraycopy(biBytes, start, bb, numBytes - length, length);
        return bb;
    }
    static numberToBytes(num, numBytes) {
        let byteArray = Buffer.alloc(numBytes);
        for (let index = 0; index < byteArray.length; index++) {
            let byte = num & 0xff;
            byteArray[index] = byte;
            num = (num - byte) / 256;
        }
        // console.log("byteArray", byteArray);
        // console.log("byteArray.reverse()", byteArray.reverse());
        // console.log("Buffer.from(byteArray.reverse())", Buffer.from(byteArray.reverse()));
        return Buffer.from(byteArray.reverse());
    }
    static stringToBytes(str, numBytes) {
        const bigN = ethers_1.BigNumber.from(str);
        // console.log("bigN", bigN);
        const bnToHex = bigN.toHexString();
        // console.log("bnToHex", bnToHex);
        const bnToHexToBytes = BytesUtils.hexToBytes(bnToHex);
        // console.log("bnToHexToBytes", bnToHexToBytes);
        const bnToHexToBytesToBuf = Buffer.from(bnToHexToBytes);
        // console.log("bnToHexToBytesToBuf", bnToHexToBytesToBuf);
        const leftPaddedBuffer = BytesUtils.leftPadBytes(bnToHexToBytesToBuf, numBytes);
        // console.log("leftPaddedBuffer", leftPaddedBuffer);
        return leftPaddedBuffer;
        // return Buffer.from(BytesUtils.hexToBytes(BigNumber.from(str).toHexString()));
    }
    static numberOrStringToBytes(input) {
        if (typeof input == "number") {
            // console.log("numberOrStringToBytes - number", input);
            return BytesUtils.numberToBytes(input, 32);
        }
        else if (typeof input == "string") {
            // console.log("numberOrStringToBytes - string", input);
            return BytesUtils.stringToBytes(input, 32);
        }
        else {
            // BigNumber
            input = input.toString();
            return BytesUtils.stringToBytes(input, 32);
        }
    }
}
exports.BytesUtils = BytesUtils;
