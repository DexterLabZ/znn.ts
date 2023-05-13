/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
/**
 * ed25519 is Twisted Edwards curve with equation of
 * ```
 * −x² + y² = 1 − (121665/121666) * x² * y²
 * ```
 */
declare const CURVE: {
    a: bigint;
    d: bigint;
    P: bigint;
    l: bigint;
    n: bigint;
    h: bigint;
    Gx: bigint;
    Gy: bigint;
};
export { CURVE };
type Hex = Uint8Array | string;
type PrivKey = Hex | bigint | number;
type PubKey = Hex | Point;
type SigType = Hex | Signature;
/**
 * Extended Point works in extended coordinates: (x, y, z, t) ∋ (x=x/z, y=y/z, t=xy).
 * Default Point works in affine coordinates: (x, y)
 * https://en.wikipedia.org/wiki/Twisted_Edwards_curve#Extended_coordinates
 */
declare class ExtendedPoint {
    readonly x: bigint;
    readonly y: bigint;
    readonly z: bigint;
    readonly t: bigint;
    constructor(x: bigint, y: bigint, z: bigint, t: bigint);
    static BASE: ExtendedPoint;
    static ZERO: ExtendedPoint;
    static fromAffine(p: Point): ExtendedPoint;
    static toAffineBatch(points: ExtendedPoint[]): Point[];
    static normalizeZ(points: ExtendedPoint[]): ExtendedPoint[];
    equals(other: ExtendedPoint): boolean;
    negate(): ExtendedPoint;
    double(): ExtendedPoint;
    add(other: ExtendedPoint): ExtendedPoint;
    subtract(other: ExtendedPoint): ExtendedPoint;
    private precomputeWindow;
    private wNAF;
    multiply(scalar: number | bigint, affinePoint?: Point): ExtendedPoint;
    multiplyUnsafe(scalar: number | bigint): ExtendedPoint;
    isSmallOrder(): boolean;
    isTorsionFree(): boolean;
    toAffine(invZ?: bigint): Point;
    fromRistrettoBytes(): void;
    toRistrettoBytes(): void;
    fromRistrettoHash(): void;
}
/**
 * Each ed25519/ExtendedPoint has 8 different equivalent points. This can be
 * a source of bugs for protocols like ring signatures. Ristretto was created to solve this.
 * Ristretto point operates in X:Y:Z:T extended coordinates like ExtendedPoint,
 * but it should work in its own namespace: do not combine those two.
 * https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-ristretto255-decaf448
 */
declare class RistrettoPoint {
    private readonly ep;
    static BASE: RistrettoPoint;
    static ZERO: RistrettoPoint;
    constructor(ep: ExtendedPoint);
    private static calcElligatorRistrettoMap;
    /**
     * Takes uniform output of 64-bit hash function like sha512 and converts it to `RistrettoPoint`.
     * The hash-to-group operation applies Elligator twice and adds the results.
     * **Note:** this is one-way map, there is no conversion from point to hash.
     * https://ristretto.group/formulas/elligator.html
     * @param hex 64-bit output of a hash function
     */
    static hashToCurve(hex: Hex): RistrettoPoint;
    /**
     * Converts ristretto-encoded string to ristretto point.
     * https://ristretto.group/formulas/decoding.html
     * @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
     */
    static fromHex(hex: Hex): RistrettoPoint;
    /**
     * Encodes ristretto point to Uint8Array.
     * https://ristretto.group/formulas/encoding.html
     */
    toRawBytes(): Uint8Array;
    toHex(): string;
    toString(): string;
    equals(other: RistrettoPoint): boolean;
    add(other: RistrettoPoint): RistrettoPoint;
    subtract(other: RistrettoPoint): RistrettoPoint;
    multiply(scalar: number | bigint): RistrettoPoint;
    multiplyUnsafe(scalar: number | bigint): RistrettoPoint;
}
/**
 * Default Point works in affine coordinates: (x, y)
 */
declare class Point {
    readonly x: bigint;
    readonly y: bigint;
    static BASE: Point;
    static ZERO: Point;
    _WINDOW_SIZE?: number;
    constructor(x: bigint, y: bigint);
    _setWindowSize(windowSize: number): void;
    static fromHex(hex: Hex, strict?: boolean): Point;
    static fromPrivateKey(privateKey: PrivKey): Promise<Point>;
    toRawBytes(): Uint8Array;
    toHex(): string;
    /**
     * Converts to Montgomery; aka x coordinate of curve25519.
     * We don't have fromX25519, because we don't know sign.
     *
     * ```
     * u, v: curve25519 coordinates
     * x, y: ed25519 coordinates
     * (u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)
     * (x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))
     * ```
     * https://blog.filippo.io/using-ed25519-keys-for-encryption
     * @returns u coordinate of curve25519 point
     */
    toX25519(): Uint8Array;
    isTorsionFree(): boolean;
    equals(other: Point): boolean;
    negate(): Point;
    add(other: Point): Point;
    subtract(other: Point): Point;
    /**
     * Constant time multiplication.
     * @param scalar Big-Endian number
     * @returns new point
     */
    multiply(scalar: number | bigint): Point;
}
/**
 * EDDSA signature.
 */
declare class Signature {
    readonly r: Point;
    readonly s: bigint;
    constructor(r: Point, s: bigint);
    static fromHex(hex: Hex): Signature;
    assertValidity(): this;
    toRawBytes(): Uint8Array;
    toHex(): string;
}
export { ExtendedPoint, RistrettoPoint, Point, Signature };
declare function bytesToHex(uint8a: Uint8Array): string;
declare function mod(a: bigint, b?: bigint): bigint;
declare function invert(number: bigint, modulo?: bigint): bigint;
declare function getExtendedPublicKey(key: PrivKey): Promise<{
    head: Uint8Array;
    prefix: Uint8Array;
    scalar: bigint;
    point: Point;
    pointBytes: Uint8Array;
}>;
/**
 * Calculates ed25519 public key.
 * 1. private key is hashed with sha512, then first 32 bytes are taken from the hash
 * 2. 3 least significant bits of the first byte are cleared
 * RFC8032 5.1.5
 */
export declare function getPublicKey(privateKey: PrivKey): Promise<Uint8Array>;
/**
 * Signs message with privateKey.
 * RFC8032 5.1.6
 */
export declare function sign(message: Hex, privateKey: Hex): Promise<Uint8Array>;
/**
 * Verifies ed25519 signature against message and public key.
 * An extended group equation is checked.
 * RFC8032 5.1.7
 * Compliant with ZIP215:
 * 0 <= sig.R/publicKey < 2**256 (can be >= curve.P)
 * 0 <= sig.s < l
 * Not compliant with RFC8032: it's not possible to comply to both ZIP & RFC at the same time.
 */
export declare function verify(sig: SigType, message: Hex, publicKey: PubKey): Promise<boolean>;
/**
 * Calculates X25519 DH shared secret from ed25519 private & public keys.
 * Curve25519 used in X25519 consumes private keys as-is, while ed25519 hashes them with sha512.
 * Which means we will need to normalize ed25519 seeds to "hashed repr".
 * @param privateKey ed25519 private key
 * @param publicKey ed25519 public key
 * @returns X25519 shared key
 */
export declare function getSharedSecret(privateKey: PrivKey, publicKey: Hex): Promise<Uint8Array>;
export declare const curve25519: {
    BASE_POINT_U: string;
    scalarMult(privateKey: Hex, publicKey: Hex): Uint8Array;
    scalarMultBase(privateKey: Hex): Uint8Array;
};
export declare const utils: {
    TORSION_SUBGROUP: string[];
    bytesToHex: typeof bytesToHex;
    getExtendedPublicKey: typeof getExtendedPublicKey;
    mod: typeof mod;
    invert: typeof invert;
    /**
     * Can take 40 or more bytes of uniform input e.g. from CSPRNG or KDF
     * and convert them into private scalar, with the modulo bias being neglible.
     * As per FIPS 186 B.1.1.
     * @param hash hash output from sha512, or a similar function
     * @returns valid private scalar
     */
    hashToPrivateScalar: (hash: Hex) => bigint;
    randomBytes: (bytesLength?: number) => Uint8Array;
    randomPrivateKey: () => Uint8Array;
    sha512: (message: Uint8Array) => Promise<Uint8Array>;
    /**
     * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
     * values. This slows down first getPublicKey() by milliseconds (see Speed section),
     * but allows to speed-up subsequent getPublicKey() calls up to 20x.
     * @param windowSize 2, 4, 8, 16
     */
    precompute(windowSize?: number, point?: Point): Point;
};
