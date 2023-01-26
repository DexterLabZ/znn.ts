/// <reference types="node" />
export declare function bufferToArrayBuffer(buf: Buffer): ArrayBuffer;
export declare function arrayBufferToBuffer(ab: ArrayBuffer): Buffer;
export declare const aes256gcm: (key: any, nonce: Buffer) => {
    encrypt: (str: any) => Promise<any[]>;
    decrypt: (enc: any, iv: any, authTag: any) => Promise<Buffer>;
    bufferToArrayBuffer: typeof bufferToArrayBuffer;
    arrayBufferToBuffer: typeof arrayBufferToBuffer;
};
