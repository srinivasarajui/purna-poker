// utils/trpc.ts
import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../../../backend/src/index'

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}