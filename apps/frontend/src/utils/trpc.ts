import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from 'backend'
import { createTRPCClient } from "@trpc/client";
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';

export const trpc = createReactQueryHooks<AppRouter>();

const wsClient = createWSClient({
    url: `ws://localhost:8080/trpc`,
});
export const client = createTRPCClient<AppRouter>({
    links: [
        wsLink({
            client: wsClient,
        }),
    ],
});