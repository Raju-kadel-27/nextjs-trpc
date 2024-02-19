import { z } from 'zod';

export const ZodAddUserSchema = z.object({
    userId: z.string()
})
export type TypeZodAddUserSchema = z.infer<
    typeof ZodAddUserSchema
>