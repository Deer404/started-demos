import { z } from "zod";
import { router, procedure } from "../trpc";

export const userRouter = router({
  getUser: procedure.input(z.string()).query(async (opts) => {
    // 获取用户逻辑
    return [];
  }),
  createUser: procedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async (opts) => {
      // 创建用户逻辑
    }),
});
