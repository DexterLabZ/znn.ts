export abstract class Client {
  abstract sendRequest(method: string, parameters: any): Promise<any>;
}
