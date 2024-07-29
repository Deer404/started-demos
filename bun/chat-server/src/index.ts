import { cors } from "hono/cors";
import { nanoid } from "nanoid";
import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
// const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new OpenAPIHono();
// const topic = "anonymous-chat-room";

// const server = Bun.serve({
//   fetch: app.fetch,
//   websocket,
//   port: 8080,
// });
console.log("启动");

type Message = {
  id: string;
  name: string;
  message: string;
  userId: string;
};
const messageList: Message[] = [];

const messageSchema = z.object({
  name: z.string(),
  message: z.string(),
  userId: z.string(),
});

const messageListSchema = messageSchema
  .extend({
    id: z.string(),
  })
  .array();
// app.get(
//   "/ws",
//   upgradeWebSocket((c) => {
//     return {
//       onMessage(event, ws) {
//         const rawWs = ws.raw as ServerWebSocket;
//         const data = event.data;
//         const message: Message = JSON.parse(data.toString());
//         rawWs.subscribe(topic);
//         messageList.push(message);
//         server.publish(topic, JSON.stringify(messageList));
//         // messageList.push(message);
//       },
//       onClose: (_, ws) => {
//         const rawWs = ws.raw as ServerWebSocket;
//         rawWs.unsubscribe(topic);
//         console.log("Connection closed");
//       },
//     };
//   })
// );

app.use(
  "/*",
  cors({
    origin: "*",
  })
);

const getMessageRoute = createRoute({
  method: "get",
  path: "/api/messages",
  responses: {
    200: {
      description: "Messages",
      content: {
        "application/json": {
          schema: messageListSchema,
        },
      },
    },
  },
});
app.openapi(getMessageRoute, (c) => {
  return c.json(messageList);
});

const postMessageRoute = createRoute({
  method: "post",
  path: "/api/message",
  request: {
    body: {
      content: {
        "application/json": {
          schema: messageSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Message created",
      content: {
        "application/json": {
          schema: messageListSchema,
        },
      },
    },
  },
});

app.openapi(postMessageRoute, async (c) => {
  const message: Omit<Message, "id"> = c.req.valid("json");
  const msg = {
    ...message,
    id: nanoid(),
  };
  messageList.push(msg);
  // server.publish(topic, JSON.stringify(messageList));
  return c.json(messageList);
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "Chat API",
    version: "1.0.0",
  },
});
app.get("/ui", swaggerUI({ url: "/doc" }));
export default app;
