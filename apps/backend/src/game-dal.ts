import { Game } from "@prisma/client";
import { prisma } from "./common";

export async function UpdateGame(game: Game) {
  game.updatedAt = new Date();
  await prisma.game.update({
    where: {
      id: game.id
    },
    data: game
  });
}

export interface NewGame extends Omit<Game, 'id' | 'createdAt' | 'updatedAt'> { }
export async function CreateGame(input: NewGame) {
  return await prisma.game.create({
    data: input
  });
}

export async function GetGame(gameId: string) {
  return await prisma.game.findUnique({
    where: {
      "id": gameId
    }
  });
}
