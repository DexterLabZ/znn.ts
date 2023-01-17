/// <reference types="node" />
declare class Crypto {
    static getPublicKey(privateKey: Buffer): Promise<Buffer>;
    static deriveKey(path: string, seed: string): Buffer;
    static sign(message: Buffer, privateKey: Buffer, publicKey: Buffer): Promise<Buffer>;
    static digest(data: Buffer, digestSize?: number): Promise<Buffer>;
}
export { Crypto };
