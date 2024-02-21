import "server-only";

import {
    createTRPCClientProxy,
    loggerLink,
    TRPCClientError
} from "@trpc/client";
import { callTRPCProcedure } from '@trpc/server';
import { observable } from "@trpc/server/observable";
import { type TRPCErrorResponse } from "@trpc/server/rpc";
import { cookies } from 'next/headers';
import { cache } from 'react';

import { appRouter, type AppRouter } from '@/trpc/api/root';
import { createTRPCContext } from '@/trpc/api/trpc';
import { transformer } from './shared';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
    return createTRPCContext({
        headers: new Headers({
            cookie: cookies().toString(),
            "x-trpc-source": "rsc",
        })
    })
})