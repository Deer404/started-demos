import { Elysia } from "elysia";
const store = new Elysia().state({
  visitor:0
})

const router = new Elysia().use(store).get("/increase", ({store}) => store.visitor++);

const ip = new Elysia().derive({as:"global"},({server,request})=>({  
  ip:server?.requestIP(request)
}))

const app = new Elysia().use([router,ip]).get("/", () => "Hello Elysia").get("/ip",({ip})=>ip).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;

