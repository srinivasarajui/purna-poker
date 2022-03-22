import type { Game } from "@prisma/client";
import { prismaMock } from "../prisma/singleton";
import { CreateGame, GetGame, UpdateGame } from "./dal";

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

test('should create new game ', async () => {
    prismaMock.game.create.mockResolvedValue(game)
    const result = await CreateGame(game);
    expect(result.adminCode).toEqual('TEST')
});

test('should Update new game ', async () => {
    prismaMock.game.update.mockResolvedValue(game)
    await UpdateGame(game);
    expect(prismaMock.game.update).toHaveBeenCalled();
});

test('should get game ', async () => {
    prismaMock.game.findUnique.mockResolvedValue(game)
    const gameResult = await GetGame('TEST2');
    expect(gameResult).toEqual(game);
});