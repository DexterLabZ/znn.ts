import { Client } from "./interfaces";
declare enum WebsocketStatus {
    uninitialized = 0,
    connecting = 1,
    running = 2,
    stopped = 3
}
declare type WSSubscriptionCallback = (data: any[]) => void;
declare class WSSubscriptions {
    callbacks: Map<string, WSSubscriptionCallback>;
    constructor();
    setCallback(id: string, callback: WSSubscriptionCallback): void;
    handleGlobalNotification(data: any): void;
    newUpdateStream(jsonResponse: string): WSUpdateStream;
}
export declare class WSUpdateStream {
    id: string;
    wsSubscribers: WSSubscriptions;
    constructor(id: string, wsSubscribers: WSSubscriptions);
    onNotification(callback: WSSubscriptionCallback): void;
}
export declare class WsClient implements Client {
    _wsRpc2Client?: any;
    _websocketIntendedState: WebsocketStatus;
    url: string;
    subscriptions: WSSubscriptions;
    constructor(url: string);
    initialize(url: string, retry?: boolean, timeout?: number): Promise<void>;
    newSubscription(id: string): WSUpdateStream;
    status(): WebsocketStatus;
    restart(): Promise<void>;
    stop(): void;
    sendRequest(method: string, parameters?: any): Promise<any>;
}
export {};
