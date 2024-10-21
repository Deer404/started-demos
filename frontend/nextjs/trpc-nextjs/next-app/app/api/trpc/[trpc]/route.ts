import { appRouter } from "@server/routers/_app";
import { createTRPCContext, fetchRequestHandler } from "@server/trpc";
import { NextRequest } from "next/server";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });

export { handler as GET, handler as POST };
