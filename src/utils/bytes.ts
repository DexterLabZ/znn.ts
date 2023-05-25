import {BigNumber} from "ethers";

export class BytesUtils {
  static encodeBigInt(number: bigint): Buffer {
    return Buffer.from(number.toString());
  }

  static arraycopy(src: any, startPos: any, dest: any, destPos: any, len: any) {
    for (let i = 0; i < len; i++) {
      dest[destPos + i] = src[startPos + i];
    }
    return dest;
  }

  static bytesToBase64(bytes: Buffer): string {
    return bytes.toString("base64");
  }

  static bytesToHex(bytes: Buffer): string {
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

  static hexToBytes(hex: string) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
  }

  static leftPadBytes(bytes: Buffer, size: number): Buffer {
    if (bytes.length >= size) {
      return bytes;
    }
    let result = Buffer.alloc(size).fill(0);
    result = BytesUtils.arraycopy(bytes, 0, result, size - bytes.length, bytes.length);

    return result;
  }

  static longToBytes(longValue: any): Buffer {
    let byteArray = Buffer.alloc(8);

    for (let index = 0; index < byteArray.length; index++) {
      let byte = longValue & 0xff;
      byteArray[index] = byte;
      longValue = (longValue - byte) / 256;
    }
    return Buffer.from(byteArray.reverse());
  }

  static bigIntToBytes(b: bigint, numBytes: number): Buffer {
    let bb = Buffer.from([]).fill(0);
    let biBytes = BytesUtils.encodeBigInt(b);
    let start = biBytes.length == numBytes + 1 ? 1 : 0;
    let length = biBytes.length > numBytes ? biBytes.length : numBytes;
    BytesUtils.arraycopy(biBytes, start, bb, numBytes - length, length);
    return bb;
  }

  static numberToBytes(num: number, numBytes: number): Buffer {
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

  static stringToBytes(str: string, numBytes: number): Buffer {
    const bigN = BigNumber.from(str);
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

  static numberOrStringToBytes(input: number | string | BigNumber): Buffer {
    if (typeof input == "number") {
      // console.log("numberOrStringToBytes - number", input);
      return BytesUtils.numberToBytes(input, 32);
    } else if (typeof input == "string") {
      // console.log("numberOrStringToBytes - string", input);
      return BytesUtils.stringToBytes(input, 32);
    } else {
      // BigNumber
      input = input.toString();
      return BytesUtils.stringToBytes(input, 32);
    }
  }

  // static stringToBytes(str: string): Buffer{
  //   let utf8Encode = new TextEncoder();
  //   return Buffer.from(utf8Encode.encode(str));
  // }

  // This works for node?
  //
  // static stringToBytes(str: string): Buffer{
  //   let myBuffer = [];
  //   let buffer = new Buffer(str, 'utf16le');
  //   for (let i = 0; i < buffer.length; i++) {
  //       myBuffer.push(buffer[i]);
  //   }
  //   return Buffer.from(myBuffer);
  // }
}
