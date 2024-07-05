import { Hono } from "hono";
import book from "./book";
import { jwt } from "hono/jwt";
const app = new Hono();
import { bearerAuth } from "hono/bearer-auth";
import { HTTPException } from "hono/http-exception";
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/book", book);

// app.use("/*", (c, next) => {
//   const token = c.req.header("Authorization");
//   console.log(token);
//   return next();
// });

app.use(
  "/*",
  bearerAuth({
    verifyToken(token, c) {
      console.log("verifyToken", token);
      return true;
    },
  })
);

app.use("/error", (c, next) => {
  throw new Error("/error Error");
});

app.onError((err, c) => {
  console.error(err);
  return c.json({
    message: err.message,
    code: err instanceof HTTPException ? err.status : 500,
    data: null,
  });
});

export default {
  port: 8080,
  fetch: app.fetch,
};
