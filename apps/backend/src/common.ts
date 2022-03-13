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

function makeid(length:number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
export const getAdminCode = () => makeid(6);