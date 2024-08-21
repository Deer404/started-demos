import { appRouter, type AppRouter } from "@server/routers/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";

export const createSSRHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: () => {},
  });

export const helpers = createSSRHelper();
