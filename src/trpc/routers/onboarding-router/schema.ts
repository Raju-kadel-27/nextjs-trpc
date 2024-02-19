import { z } from 'zod';

export const ZodOnBoardingUserSchema = z.object({
    userId: z.string()
})
export type TypeZodOnBoardingUserSchema = z.infer<
    typeof ZodOnBoardingUserSchema
>