"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytesUtils = void 0;
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
        return bytes.toString('base64');
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
        let start = (biBytes.length == numBytes + 1) ? 1 : 0;
        let length = (biBytes.length > numBytes) ? biBytes.length : numBytes;
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
        return Buffer.from(byteArray.reverse());
    }
}
exports.BytesUtils = BytesUtils;
