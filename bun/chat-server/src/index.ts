import { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";
const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();
const topic = "anonymous-chat-room";

const server = Bun.serve({
  fetch: app.fetch,
  websocket,
  port: 8080,
});
type Message = {
  id: string;
  name: string;
  message: string;
  userId: string;
};
const messageList: Message[] = [];

app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        const rawWs = ws.raw as ServerWebSocket;
        const data = event.data;
        const message: Message = JSON.parse(data.toString());
        rawWs.subscribe(topic);
        messageList.push(message);
        server.publish(topic, JSON.stringify(messageList));
        // messageList.push(message);
      },
      onClose: (_, ws) => {
        const rawWs = ws.raw as ServerWebSocket;
        rawWs.unsubscribe(topic);
        console.log("Connection closed");
      },
    };
  })
);

app.use(
  "/*",
  cors({
    origin: "*",
  })
);

app.get("/messages", (c) => {
  return c.json(messageList);
});

app.post("/message", async (c) => {
  const message: Message = await c.req.json();
  const msg = {
    ...message,
    id: nanoid(),
  };
  messageList.push(msg);
  // server.publish(topic, JSON.stringify(messageList));
  return c.json(messageList);
});

export default app;
