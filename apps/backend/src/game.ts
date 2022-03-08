import * as dal from "./game-dal";

import { EmitGameChange, GetEventCode, createRouter, gameChangeEmitter } from "./common";

import type {Game} from "@prisma/client";
import { Subscription } from "@trpc/server";
import { z } from "zod";

const CreateGameInput = z.object({
  name: z.string(),
  adminCode: z.string(),
  votingSystemId: z.string(),
});
type CreateGameInputType = z.infer<typeof CreateGameInput>;
async function CreateGame({ input }: { input: CreateGameInputType }) {
  return await dal.CreateGame({
    "name": input.name,
    "adminCode": input.adminCode,
    "didGameStart": false,
    "currentStoryId": '',
    "participants": [],
    "stories": [],
    "votingSystemId": input.votingSystemId
  });
}

const AddParticipantInput = z.object({
  gameId: z.string(),
  name: z.string(),
  isAdmin: z.boolean(),
  isConnected: z.boolean(),
})
type AddParticipantInputType = z.infer<typeof AddParticipantInput>;
async function AddParticipant({ input }: { input: AddParticipantInputType }) {
  const game = await dal.GetGame(input.gameId);
  if (!game) {
    return
  }
  const participants = game.participants || [];
  game.participants = [...participants, input]
  await dal.UpdateGame(game);
  EmitGameChange(game);
}

const OnGameUpdated = z.object({
  gameId: z.string()
})
type OnGameUpdatedType = z.infer<typeof OnGameUpdated>;

async function gameSubscription({ input }: { input: OnGameUpdatedType }) {
  return new Subscription<Game>((emit) => {
    const onGameChange = (data: Game) => emit.data(data);
    const eventCode = GetEventCode(input.gameId);
    gameChangeEmitter.on(eventCode, onGameChange);
    return () => gameChangeEmitter.off(eventCode, onGameChange);
  });

}

export const GameRouter = createRouter()
  .mutation("createGame", { input: CreateGameInput, resolve: CreateGame })
  .mutation("addParticipant", { input: AddParticipantInput, resolve: AddParticipant })
  .subscription("gameUpdated", { input: OnGameUpdated,resolve: gameSubscription});