import type { ZodError } from 'zod';

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

// 定义环境变量的验证模式
const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(8080),
  LOG_LEVEL: z.enum([
    'fatal',
    'error',
    'warn',
    'info',
    'debug',
    'trace',
    'silent',
  ]),
  // DATABASE_URL: z.string().url(),
  // DATABASE_AUTH_TOKEN: z.string().optional(),
});
//   .superRefine((input, ctx) => {
//     if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.invalid_type,
//         expected: 'string',
//         received: 'undefined',
//         path: ['DATABASE_AUTH_TOKEN'],
//         message: 'DATABASE_AUTH_TOKEN is required in production',
//       });
//     }
//   });

export type EnvType = z.infer<typeof EnvSchema>;

// 加载并验证环境变量
function loadEnvConfig(): EnvType {
  expand(config());

  try {
    // eslint-disable-next-line node/no-process-env
    return EnvSchema.parse(process.env);
  } catch (e) {
    const error = e as ZodError;
    console.error('🙅 Invalid env:');
    console.error(error.flatten());
    process.exit(1);
  }
}

// 导出验证后的环境变量
const env = loadEnvConfig();
export default env;
