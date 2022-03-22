import type { Game } from "@prisma/client";
import { emitGameChange, gameChangeEmitter, getAdminCode, getEventCode } from "./util";

test('getEventCode is returning correctly', () => {
    expect(getEventCode('123')).toBe('OnGameChange-123');
});

test('validate that proper event is dispatched', (done) => {
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
    gameChangeEmitter.on(getEventCode(game.id), (newGame: Game) => {
        expect(newGame.id).toBe(game.id);
        done();
    });
    emitGameChange(game);

});