import { z } from 'zod';

export const configSchema = z.object({
  server: z.object({
    nodeEnv: z
      .string()
      .nonempty()
      .transform((x) => x.toLowerCase())
      .refine((x) => ['development', 'production', 'test'].includes(x), {
        message:
          'NODE_ENV must be one of "development", "production", or "test"',
      })
      .default('development'),
    host: z.string().nonempty().default('localhost'),
    port: z.number().int().positive().default(3000),
  }),
  mailer: z.object({
    host: z.string().nonempty().default('smtp.zoho.email'),
    port: z.number().int().positive().default(587),
    secure: z.boolean().default(false),
    user: z.string().nonempty(),
    pass: z.string().nonempty(),
  }),
});

export type Config = z.infer<typeof configSchema>;
