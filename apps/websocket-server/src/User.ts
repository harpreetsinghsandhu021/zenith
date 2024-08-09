import { WebSocket } from "ws";
import {
  IncomingMessage,
  SUBSCRIBE,
  UNSUBSCRIBE,
} from "./messages/incomingMessages";
import { subscriptionManager } from "./subscriptionManager";
import { OutgoingMessage } from "./messages/outgoingMessages";

export class User {
  private id: string;
  private ws: WebSocket;

  constructor(id: string, ws: WebSocket) {
    this.id = id;
    this.ws = ws;
    this.addListeners();
  }

  emit(message: OutgoingMessage) {
    this.ws.send(JSON.stringify(message));
  }
  addListeners() {
    this.ws.on("message", (message: string) => {
      const parsedMessage: IncomingMessage = JSON.parse(message);

      if (parsedMessage.method === SUBSCRIBE) {
        parsedMessage.params.forEach((s) =>
          subscriptionManager.getInstance().subscribe(this.id, s)
        );
      }

      if (parsedMessage.method === UNSUBSCRIBE) {
        parsedMessage.params.forEach((s) => {
          subscriptionManager
            .getInstance()
            .unsubscribe(this.id, parsedMessage.params[0] as string);
        });
      }
    });
  }
}
