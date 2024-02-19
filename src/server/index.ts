import { publicProcedure, router } from './trpc';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

console.log('Prisma is being initialized now() on app router');
console.log('Prisma Client has been ordered now ()');

const prisma = new PrismaClient()
const appRouter = router({
    userById: publicProcedure
        .input(z.string())
        .query(async (opts) => {
            const { input } = opts;

            const input: string
            // Retrieve the user with the given ID
            const user = await db.user.findById(input);

            const user: User | undefined
            return user;
        }),

    userCreate: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async (opts) => {
            const { input } = opts;

            const input: {
                name: string;
            }
            // Create a new user in the database
            const user = await db.user.create(input);
            const user: {
                name: string;
                id: string;
            }
            return user;
        }),
});

export type AppRouter = typeof appRouter;
const server = createHTTPServer({
    router: appRouter,
  });
  server.listen(3000);
  // Listening on server port 3000

 


