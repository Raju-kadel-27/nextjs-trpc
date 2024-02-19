import { createTRPCRouter, withAuth } from '@/trpc/api/trpc'
import { ZodOnBoardingUserSchema} from './schema';

export const OnBoardingRouter = createTRPCRouter({
    addUser: withAuth
        .input(ZodOnBoardingUserSchema)
        .mutation(async ({ ctx, input })=>{
            const { db } = ctx;
            // @TODO(hkirat)
            // Add user to db
            return { success: true }
        })
})