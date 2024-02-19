import { createTRPCRouter, withAuth } from '@/trpc/api/trpc'
import { ZodAddUserSchema } from './schema';

export const UserRouter = createTRPCRouter({
    addUser: withAuth
        .input(ZodAddUserSchema)
        .mutation(async ({ ctx, input })=>{
            const { db } = ctx;
            // @TODO(hkirat)
            // Add user to db
            return { success: true }
        })
})