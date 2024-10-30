import { Hono } from "hono";
import { safe } from "./safe";

const app = new Hono();

app.post("/translate", async (c) => {
  const query = c.req.query();
  const body = await c.req.json();
  console.log("query", query);
  console.log("body", body);
  const key = query["key"];
  if (!query["key"]) {
    return c.json("Key is required!");
  }
  const targetUrl = `https://deeplx.missuo.ru/translate?key=${encodeURIComponent(
    key
  )}`;
  const newHeaders = new Headers();

  newHeaders.set("Content-Type", "application/json");
  const jsonBody = JSON.stringify(body);
  const [error, res] = await safe(
    (
      await fetch(targetUrl, {
        method: "POST",
        headers: newHeaders,
        body: jsonBody,
      })
    ).json()
  );
  if (error) {
    return c.json("Error");
  }
  const json = await res;
  console.log("json", json);
  return c.json(json);
});

export default {
  port: process.env.PORT || 5011,
  fetch: app.fetch,
};
