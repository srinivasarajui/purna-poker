import { router, Subscription } from "@trpc/server";
import type { Game, Participant } from "@prisma/client";
import { nanoid } from "nanoid";
import { z } from "zod";

import { GetGame, UpdateGame, CreateGame as CreateGameDAL } from "./dal";
import { gameChangeEmitter, getAdminCode, getEventCode } from "./util";
import { addStory, flipPoints, manageParticipant, moveToNextStory, moveToPreviousStory, processGameUpdate, removeStory, resetPoints, setEstimation, startGame, updateStoryDesc, updateStoryPoints } from "./handlers";
import { GameCache } from "./cache";
const gameCache = new GameCache(GetGame, UpdateGame);
const CreateGameInput = z.object({
    name: z.string(),
    votingSystemId: z.string(),
    userName: z.string(),
});
async function CreateGame({ input }: { input: z.infer<typeof CreateGameInput> }) {
    const participant: Participant = {
        name: input.userName,
        isConnected: false,
        isAdmin: true,
    };
    return await CreateGameDAL({
        "name": input.name,
        "adminCode": nanoid(10),
        "didGameStart": false,
        "currentStoryId": '',
        "participants": [participant],
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
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        game.participants.push({ ...input })
    });
}

const ChangeGameNameInput = z.object({
    gameId: z.string(),
    name: z.string(),
})
async function ChangeGameName({ input }: { input: z.infer<typeof ChangeGameNameInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        game.name = input.name;
    });
}

const AddStoryInput = z.object({
    gameId: z.string(),
    description: z.string(),
})
async function AddStory({ input }: { input: z.infer<typeof AddStoryInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        addStory(game, input.description);
    });
}


const RemoveStoryInput = z.object({
    gameId: z.string(),
    storyId: z.string(),
})
async function RemoveStory({ input }: { input: z.infer<typeof RemoveStoryInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        removeStory(game, input.storyId);
    });
}

const UpdateStoryDescInput = z.object({
    gameId: z.string(),
    storyId: z.string(),
    description: z.string(),
})
async function UpdateStoryDesc({ input }: { input: z.infer<typeof UpdateStoryDescInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        updateStoryDesc(game, input.storyId, input.description);
    });
}

const GameIdInput = z.object({
    gameId: z.string()
})
async function StartGame({ input }: { input: z.infer<typeof GameIdInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        startGame(game);
    });
}

async function StopGame({ input }: { input: z.infer<typeof GameIdInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        game.didGameStart = false;
    });
}

async function FlipPoints({ input }: { input: z.infer<typeof GameIdInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        flipPoints(game);
    });
}

async function MoveToPreviousStory({ input }: { input: z.infer<typeof GameIdInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        moveToPreviousStory(game);
    });
}

async function MoveToNextStory({ input }: { input: z.infer<typeof GameIdInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        moveToNextStory(game);
    });
}

async function ResetPoints({ input }: { input: z.infer<typeof GameIdInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        resetPoints(game);
    });
}

const SetEstimationInput = z.object({
    gameId: z.string(),
    userName: z.string(),
    points: z.number()
})
async function SetEstimation({ input }: { input: z.infer<typeof SetEstimationInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        setEstimation(game, input.userName, input.points);
    });
}

const UpdatePointsInput = z.object({
    gameId: z.string(),
    points: z.number()
})
async function UpdatePoints({ input }: { input: z.infer<typeof UpdatePointsInput> }) {
    processGameUpdate(gameCache, input.gameId, (game: Game) => {
        updateStoryPoints(game, input.points);
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
        if (!game) {
            throw Error('Game not found')
        }
        manageParticipant(game, input.userName, true, input.adminCode);
        const eventCode = getEventCode(input.gameId);
        gameChangeEmitter.on(eventCode, onGameChange);
        onGameChange(game);
        return () => {
            gameChangeEmitter.off(eventCode, onGameChange);
            manageParticipant(game, input.userName, false, input.adminCode);
            const anyParticipant = game.participants.map(item => item.isConnected).reduce((item, is) => is || item, false);
            if (!anyParticipant) {
                gameCache.RemoveFromCache(input.gameId)
            }

        }
    });

}

async function GetGameById({ input }: { input: z.infer<typeof GameIdInput> }) {
    return gameCache.get(input.gameId);
}
export const GameRouter = router()
    .mutation("createGame", { input: CreateGameInput, resolve: CreateGame })
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
    .query("getbyId", { input: GameIdInput, resolve: GetGameById })
    .subscription("gameUpdated", { input: OnGameUpdated, resolve: gameSubscription });