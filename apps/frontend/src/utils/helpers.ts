import { Game } from "backend";

export function getStoryById(game: Game, storyId: string) {
    const story = game.stories.find(item => item.id === storyId);
    if (!story) {
        throw Error('Trying to get story that is not present')
    }
    return story
}
