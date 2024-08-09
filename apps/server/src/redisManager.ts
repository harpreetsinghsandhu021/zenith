import { RedisClientType, createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import { messageToEngine } from "./types/to";
import { messageFromOrderBook } from "./types";

export class RedisManager {
  private client: RedisClientType;
  private publisher: RedisClientType;
  private static instance: RedisManager;

  constructor() {
    this.client = createClient();
    this.client.connect();
    this.publisher = createClient();
    this.publisher.connect();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }

    return this.instance;
  }

  public sendAndAwait(message: messageToEngine) {
    return new Promise<messageFromOrderBook>((resolve) => {
      const id = this.getRandomClientId();

      this.client.subscribe(id, (message) => {
        this.client.unsubscribe(id);
        resolve(JSON.parse(message));
      });

      //   this.publisher.lPush("messages")
    });
  }

  public getRandomClientId() {
    return uuidv4();
  }
}
