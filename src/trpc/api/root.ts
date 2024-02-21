import { createTRPCRouter } from "./trpc";
import { UserRouter } from '@/trpc/routers/user-router/router';
import { OnBoardingRouter } from '@/trpc/routers/onboarding-router/router';

export const appRouter = createTRPCRouter({
    user: UserRouter,
    onBoarding: OnBoardingRouter
});

export type AppRouter = typeof appRouter;