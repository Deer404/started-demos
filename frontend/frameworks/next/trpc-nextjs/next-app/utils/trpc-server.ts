import "server-only";

import { appRouter, createCaller, type AppRouter } from "@server/routers/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { createTRPCContext } from "@server/trpc";
import { headers } from "next/headers";
import { cache } from "react";
import { createQueryClient } from "./query-client";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

// export const createSSRHelper = () =>
//   createServerSideHelpers({
//     router: appRouter,
//     ctx: () => {},
//   });
// export const helpers = createSSRHelper();

const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});
const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);
export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
