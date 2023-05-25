export declare abstract class Client {
    abstract sendRequest(method: string, parameters: any): Promise<any>;
}
