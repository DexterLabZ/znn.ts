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

export const netId: number = 3;
