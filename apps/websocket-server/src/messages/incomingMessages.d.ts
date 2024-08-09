export declare const SUBSCRIBE = "SUBSCRIBE";
export declare const UNSUBSCRIBE = "UNSUBSCRIBE";
export type subscribeMessage = {
    method: typeof SUBSCRIBE;
    params: string[];
};
export type unSubscribeMessage = {
    method: typeof UNSUBSCRIBE;
    params: string[];
};
export type IncomingMessage = subscribeMessage | unSubscribeMessage;
//# sourceMappingURL=incomingMessages.d.ts.map