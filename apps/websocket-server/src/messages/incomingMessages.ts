export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export type subscribeMessage = {
  method: typeof SUBSCRIBE;
  params: string[];
};

export type unSubscribeMessage = {
  method: typeof UNSUBSCRIBE;
  params: string[];
};

export type IncomingMessage = subscribeMessage | unSubscribeMessage;
