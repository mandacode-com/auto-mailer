import { z } from 'zod';

export const emailVerificationSchema = z.object({
  to: z.string().email(),
  subject: z.string().nonempty(),
  verification: z.object({
    link: z.string().url(),
  }),
});
