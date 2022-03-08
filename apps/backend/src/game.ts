import { CreateGame as CreateGameDAL } from "./game-dal";
import {  GetEventCode, createRouter, gameChangeEmitter, gameCache } from "./common";
import type {Game} from "@prisma/client";
import { Subscription } from "@trpc/server";
import { z } from "zod";
import { addStory, flipPoints, manageParticipant, moveToNextStory, moveToPreviousStory, processGameUpdate, removeStory, resetPoints, setEstimation, startGame, updateStoryDesc, updateStoryPoints } from "./game-util";

const CreateGameInput = z.object({
  name: z.string(),
  adminCode: z.string(),
  votingSystemId: z.string(),
});
async function CreateGame({ input }: { input: z.infer<typeof CreateGameInput> }) {
  return await CreateGameDAL({
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
async function AddParticipant({ input }: { input: z.infer<typeof AddParticipantInput> }) {
  processGameUpdate(input.gameId, (game:Game)=>{
    game.participants.push({...input})
  });
}

const ChangeGameNameInput = z.object({
  gameId: z.string(),
  name: z.string(),
})
async function ChangeGameName({ input }: { input: z.infer<typeof ChangeGameNameInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    game.name = input.name;
  });
}

const AddStoryInput = z.object({
  gameId: z.string(),
  description: z.string(),
})
async function AddStory({ input }: { input: z.infer<typeof AddStoryInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    addStory(game, input.description);
  });
}


const RemoveStoryInput = z.object({
  gameId: z.string(),
  storyId: z.string(),
})
async function RemoveStory({ input }: { input: z.infer<typeof RemoveStoryInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    removeStory(game, input.storyId);
  });
}

const UpdateStoryDescInput = z.object({
  gameId: z.string(),
  storyId: z.string(),
  description: z.string(),
})
async function UpdateStoryDesc({ input }: { input: z.infer<typeof UpdateStoryDescInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    updateStoryDesc(game, input.storyId,input.description);
  });
}

const GameIdInput = z.object({
  gameId: z.string()
})
async function StartGame({ input }: { input: z.infer<typeof GameIdInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    startGame(game);
  });
}

async function StopGame({ input }: { input: z.infer<typeof GameIdInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    game.didGameStart=false;
  });
}

async function FlipPoints({ input }: { input: z.infer<typeof GameIdInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    flipPoints(game);
  });
}

async function MoveToPreviousStory({ input }: { input: z.infer<typeof GameIdInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    moveToPreviousStory(game);
  });
}

async function MoveToNextStory({ input }: { input: z.infer<typeof GameIdInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    moveToNextStory(game);
  });
}

async function ResetPoints({ input }: { input: z.infer<typeof GameIdInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    resetPoints(game);
  });
}

const SetEstimationInput = z.object({
  gameId: z.string(),
  userName: z.string(),
  points: z.number()
})
async function SetEstimation({ input }: { input: z.infer<typeof SetEstimationInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    setEstimation(game,input.userName,input.points);
  });
}

const UpdatePointsInput = z.object({
  gameId: z.string(),
  points: z.number()
})
async function UpdatePoints({ input }: { input: z.infer<typeof UpdatePointsInput> }) {
  processGameUpdate(input.gameId, (game: Game) => {
    updateStoryPoints(game,input.points);
  });
}

const OnGameUpdated = z.object({
  gameId: z.string(),
  userName: z.string(),
  adminCode: z.string().optional(),
})
async function gameSubscription({ input }: { input: z.infer<typeof OnGameUpdated> }) {
  return new Subscription<Game>(async (emit) => {
    const onGameChange = (data: Game) => emit.data(data);
    const game = await gameCache.get(input.gameId);
    manageParticipant(game,input.userName,true,input.adminCode);
    const eventCode = GetEventCode(input.gameId);
    gameChangeEmitter.on(eventCode, onGameChange);
    return () => {
      gameChangeEmitter.off(eventCode, onGameChange);
      manageParticipant(game, input.userName, false, input.adminCode);
      const anyParticipant = game.participants.map(item => item.isConnected).reduce( (item,is) => is || item, false);
      if (!anyParticipant){
        gameCache.RemoveFromCache(input.gameId)
      }

    }
  });

}

async function GetGameById({ input }: { input: z.infer<typeof GameIdInput> }) {
  return gameCache.get(input.gameId);
}

export const GameRouter = createRouter()
  .mutation("createGame", { input: CreateGameInput, resolve: CreateGame })
  .mutation("getbyId", { input: GameIdInput, resolve: GetGameById })
  .mutation("addParticipant", { input: AddParticipantInput, resolve: AddParticipant })
  .mutation("changeGameName", { input: ChangeGameNameInput, resolve: ChangeGameName })
  .mutation("addStory", { input: AddStoryInput, resolve: AddStory })
  .mutation("removeStory", { input: RemoveStoryInput, resolve: RemoveStory })
  .mutation("updateStoryDesc", { input: UpdateStoryDescInput, resolve: UpdateStoryDesc })
  .mutation("startGame", { input: GameIdInput, resolve: StartGame })
  .mutation("stopGame", { input: GameIdInput, resolve: StopGame })
  .mutation("flipPoints", { input: GameIdInput, resolve: FlipPoints })
  .mutation("moveToPreviousStory", { input: GameIdInput, resolve: MoveToPreviousStory })
  .mutation("moveToNextStory", { input: GameIdInput, resolve: MoveToNextStory })
  .mutation("resetPoints", { input: GameIdInput, resolve: ResetPoints })
  .mutation("setEstimation", { input: SetEstimationInput, resolve: SetEstimation })
  .mutation("updatePoints", { input: UpdatePointsInput, resolve: UpdatePoints })
  .subscription("gameUpdated", { input: OnGameUpdated,resolve: gameSubscription});