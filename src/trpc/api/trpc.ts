import { initTRPC, TRPCError, } from '@trpc/server';
import superJson from 'superjson';
import { ZodError } from 'zod';

import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import { getIp, getUserAgent } from '@/lib/headers';

export const createTRPCContext = async (opts: { headers: Headers }) => {
    const session = await getServerAuthSession();
    return {
        db,
        session,
        requestIp: getIp(opts.headers),
        userAgent: getUserAgent(opts.headers),
        ...opts
    }
}

type CreateTRPCContextType = Awaited<ReturnType<typeof createTRPCContext>>;

export const withAuthTRPCContext = ({ session, ...rest }: CreateTRPCContextType) => {

    if (!session || !session.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return {
        ...rest,
        session: { ...session, user: session.user }
    }
}

export type withAuthTrpcContextType = ReturnType<typeof withAuthTRPCContext>

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superJson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null
            },
        }
    }
});

export const publicProcedure = t.procedure;

export const createTRPCRouter = t.router;

export const withAuth = t.procedure.use(({ ctx: ctx_, next }) => {
    const ctx = withAuthTRPCContext(ctx_);
    return next({
        ctx
    })
})
