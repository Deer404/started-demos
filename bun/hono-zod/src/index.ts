import { swaggerUI } from "@hono/swagger-ui";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

app.post("/users/new", zValidator("json", userSchema), async (c) => {
  const user = c.req.valid("json");
  console.log(user.name); // string
  console.log(user.age); // number
});

app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
