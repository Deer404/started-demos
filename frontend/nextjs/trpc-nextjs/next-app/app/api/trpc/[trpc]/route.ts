import { appRouter } from "@server/routers/_app";
import { fetchRequestHandler } from "@server/trpc";
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
