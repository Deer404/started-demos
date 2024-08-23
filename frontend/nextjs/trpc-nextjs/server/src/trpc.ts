import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import superjson from "superjson";

export { fetchRequestHandler } from "@trpc/server/adapters/fetch";
export { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

export const createCallerFactory = t.createCallerFactory;

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
  };
};
