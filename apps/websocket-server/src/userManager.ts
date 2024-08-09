import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import { User } from "./User";
import { subscriptionManager } from "./subscriptionManager";

export class userManager {
  private static instance: userManager;
  private users: Map<string, User> = new Map();

  constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new userManager();
    }

    return this.instance;
  }

  public addUser(ws: WebSocket) {
    const id = this.getRandomId();
    const user = new User(id, ws);
    this.users.set(id, user);
    this.registerOnClose(id, ws);

    return user;
  }

  private registerOnClose(id: string, ws: WebSocket) {
    ws.on("close", () => {
      this.users.delete(id);
      subscriptionManager.getInstance().userLeft(id);
    });
  }

  public getUser(id: string) {
    return this.users.get(id);
  }

  private getRandomId() {
    return uuidv4();
  }
}
