import { z } from "zod";
import { procedure, router } from "../trpc";
import { userRouter } from "./user";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
