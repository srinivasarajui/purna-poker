import startServer, { appRouter } from './server';
export type AppRouter = typeof appRouter;
startServer();