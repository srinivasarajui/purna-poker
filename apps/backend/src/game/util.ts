import { EventEmitter } from 'events';
import type { Game } from '@prisma/client';
import { nanoid } from 'nanoid';
export const getAdminCode = nanoid(10);

// create a global event emitter (could be replaced by redis, etc)
export const gameChangeEmitter = new EventEmitter();
export const getEventCode = (gameId: string) => `OnGameChange-${gameId}`;
export const emitGameChange = (game: Game) => { gameChangeEmitter.emit(getEventCode(game.id), game) };
