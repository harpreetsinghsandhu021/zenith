import { RedisClientType, createClient } from "redis";
import { ORDER_UPDATE, TRADE_ADDED } from "./types";
import { WsMessage } from "./types/toWs";
import { MessageToApi } from "./types/toApi";

type DBMessage =
  | {
      type: typeof TRADE_ADDED;
      data: {
        id: string;
        isBuyerMaker: boolean;
        price: string;
        quantity: string;
        quoteQuantity: string;
        timeStamp: number;
        market: string;
      };
    }
  | {
      type: typeof ORDER_UPDATE;
      data: {
        orderId: string;
        executedQuantity: string;
        market: string;
        price: string;
        quantity: string;
        side: "buy" | "sell";
      };
    };

export class redisManager {
  private client: RedisClientType;
  private static instance: redisManager;
  constructor() {
    this.client = createClient();
    this.client.connect();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new redisManager();
    }
    return this.instance;
  }

  public pushMessage(message: DBMessage) {
    this.client.lPush("db_processor", JSON.stringify(message));
  }

  public publishMessage(channel: string, message: WsMessage) {
    this.client.publish(channel, JSON.stringify(message));
  }

  public sendToAPI(clientId: string, message: MessageToApi) {
    this.client.publish(clientId, JSON.stringify(message));
  }
}
