import { GameRouter } from "./game";
import { VotingSystemsRouter } from "./voting-system";
import { createRouter } from "./common";
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';

import { VotingSystem, Game as GameType } from "@prisma/client";

const PORT = (process.env.PORT || 3000) as number;
const wss = new ws.Server({
  port: PORT,
});
const appRouter = createRouter()
  .merge('game.', GameRouter)
  .merge('votingSystems.', VotingSystemsRouter);

const handler = applyWSSHandler({ wss, router: appRouter });

wss.on('connection', (ws: any) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log(`✅ WebSocket Server listening on ws://localhost:${PORT}`);

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});

export type AppRouter = typeof appRouter;
export type VotingSystemType = VotingSystem;
export type Game = GameType;

