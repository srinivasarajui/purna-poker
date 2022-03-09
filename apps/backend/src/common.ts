import { EventEmitter } from 'events';
import type { Game } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { router } from "@trpc/server";

export const createRouter = () => router();

// create a global event emitter (could be replaced by redis, etc)
export const gameChangeEmitter = new EventEmitter();
export const GetEventCode = (gameId:string) => `OnGameChange-${gameId}`;
export const prisma = new PrismaClient();
export const EmitGameChange = (game: Game) => { gameChangeEmitter.emit(GetEventCode(game.id), game) };