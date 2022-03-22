import { prismaMock } from "../prisma/singleton";
import type { Game, Story } from "@prisma/client";
import { addStory, getStoryById, removeStory, updateStoryDesc } from "./handlers";
import { sampleVotingSystems } from "../voting-system/sample.data";
import { nanoid } from "nanoid";

beforeEach(() => {
    prismaMock.votingSystem.findMany.mockResolvedValue(sampleVotingSystems)
});

test('removeStory validate', () => {
    const story: Story = {
        id: 'SID',
        description: 'desc',
        isEstimated: false,
        areCardsOpen: false,
        participantEstimations: [],
        storyPoints: -3,
    }
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
        stories: [story]

    };
    removeStory(game, 'SID');
    expect(game.stories.length).toBe(0);

});

test('addStory validate', () => {
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
    addStory(game, 'description');
    expect(game.stories.length).toBe(1);
    expect(game.stories[0].isEstimated).toBe(false);
    expect(game.stories[0].areCardsOpen).toBe(false);
    expect(game.stories[0].description).toBe('description');

});


test('updateStoryDesc validate', () => {
    const story: Story = {
        id: 'SID',
        description: 'desc',
        isEstimated: false,
        areCardsOpen: false,
        participantEstimations: [],
        storyPoints: -3,
    }
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
        stories: [story]

    };
    updateStoryDesc(game, 'SID', 'new Desc');
    expect(story.description).toBe('new Desc');

});
