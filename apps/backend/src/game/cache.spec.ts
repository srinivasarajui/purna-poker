import type { Game } from "@prisma/client";
import { GameCache, GetGameType, UpdateGameType } from "./cache";

const game: Game = {
    id: 'TEST',
    adminCode: 'TEST',
    createdAt: new Date(),
    updatedAt: new Date(),
    participants: [],
    votingSystemId: 'fib',
    name: 'test',
    didGameStart: false,
    currentStoryId: '1',
    stories: []

};

let GetGameFn: jest.MockedFunction<GetGameType>;
let UpdateGameFn: jest.MockedFunction<UpdateGameType>;
let gameCache: GameCache;
beforeEach(() => {
    GetGameFn = jest.fn();
    UpdateGameFn = jest.fn();
    gameCache = new GameCache(GetGameFn, UpdateGameFn);
});
test('validate that GetGame is called only once', async () => {
    GetGameFn.mockResolvedValueOnce(game);
    const data = await gameCache.get('TEST');
    expect(data?.id).toBe('TEST');
    expect(GetGameFn).toHaveBeenCalledTimes(1);
    await gameCache.get('TEST');
    expect(GetGameFn).toHaveBeenCalledTimes(1);
});


test('validate that GetGame is called multiple times after RemoveFromCache', async () => {
    GetGameFn.mockResolvedValue(game);
    const data = await gameCache.get('TEST');
    expect(data?.id).toBe('TEST');
    expect(GetGameFn).toHaveBeenCalledTimes(1);
    await gameCache.get('TEST');
    expect(GetGameFn).toHaveBeenCalledTimes(1);
    gameCache.RemoveFromCache('TEST');
    await gameCache.get('TEST');
    expect(GetGameFn).toHaveBeenCalledTimes(2);
});

test('validate it throws error incase getGame dosent return a object', async () => {
    GetGameFn.mockResolvedValueOnce(null);
    const data = await gameCache.get('123');
    expect(data).toBeNull();
});

test('validate that Update is called ', async () => {
    GetGameFn.mockResolvedValue(game);
    const data = await gameCache.get('TEST');
    expect(data?.id).toBe('TEST');
    expect(GetGameFn).toHaveBeenCalledTimes(1);
    if (data) {
        data.name = "Test";
        await gameCache.update(data);
        expect(GetGameFn).toHaveBeenCalledTimes(1);
        const data2 = await gameCache.get('TEST');
        expect(data2?.name).toBe('Test');
    }
});
