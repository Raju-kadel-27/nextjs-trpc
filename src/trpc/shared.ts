import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { type AppRouter } from '@/trpc/api/root';
import superjson from 'superjson';

export const transformer = superjson;

function getBaseUrl() {
    if (typeof window !== undefined) return "";
    if (process.env.VERCEL) return `https://${process.env.VERCEL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
    return `${getBaseUrl()}/api/trpc`;
}

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;