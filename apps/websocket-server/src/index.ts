import WebSocket, { WebSocketServer } from "ws";
import { userManager } from "./userManager";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  userManager.getInstance().addUser(ws);
});
