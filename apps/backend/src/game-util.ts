import { Game, Story, Participant } from "@prisma/client";
import { nanoid } from 'nanoid'
import { EmitGameChange } from "./common";
import { gameCache } from "./game-cache";
import { roundupPoints } from "./voting-system";

const DEFAULT_STORY_POINTS = -3

export function addStory(game: Game, description:string) {
  const story:Story  = {
    id: nanoid(),
    description:description,
    isEstimated:false,
    areCardsOpen:true,
    participantEstimations:[],
    storyPoints: DEFAULT_STORY_POINTS,
  }
  game.stories = [...game.stories,story];
}

export function removeStory(game: Game, storyId: string) {
  game.stories = game.stories.filter(item=> item.id!==storyId);
}

function getStoryById(game: Game, storyId: string){
  const story = game.stories.find(item => item.id === storyId);
  if (!story) {
    throw Error('Trying to get story that is not present')
  }
  return story
}

export function updateStoryDesc(game: Game, storyId: string, description:string) {
  const story = getStoryById(game, storyId);
  story.description=description
}

export function manageParticipant(game: Game, name: string,isConnected: boolean,adminCode?:string) {
  game.votingSystemId
  let participant= game.participants.find(value => value.name === name)
  if (participant){
    participant.isConnected=isConnected;
    if (adminCode){
      participant.isAdmin = game.adminCode === adminCode;
    }
  }else{
    let participant: Participant = {
      isAdmin: game.adminCode === adminCode,
      isConnected:isConnected,
      name:name
    };
    game.participants.push(participant);
  }
}

export function startGame(game:Game) {

  if (game.stories.length != 0) {
    game.didGameStart = true;
    game.currentStoryId = game.stories[0].id;
  }
}

export function moveToNextStory(game: Game) {
    const index = game.stories.findIndex(item => item.id === game.currentStoryId);
    const nextIndex = (index + 1) % game.stories.length;
    game.currentStoryId = game.stories[nextIndex].id;
}

export function moveToPreviousStory(game: Game) {
    const index = game.stories.findIndex(item => item.id === game.currentStoryId);
    const nextIndex = index == 0 ? game.stories.length - 1 : (index - 1);
    game.currentStoryId = game.stories[nextIndex].id;

}

export function updateStoryPoints(game: Game,points: number) {
  getStoryById(game, game.currentStoryId).storyPoints = points;
}
export function resetPoints(game:Game) {
  if (game.currentStoryId) {
  const story = getStoryById(game, game.currentStoryId)
    story.storyPoints = DEFAULT_STORY_POINTS;
    story.areCardsOpen = false;
    story.isEstimated = false;
  }
}

export async function flipPoints(game: Game) {
  const story = getStoryById(game, game.currentStoryId);
  story.areCardsOpen = !story.areCardsOpen;
  if (story.areCardsOpen && story.participantEstimations.length > 0) {
    story.isEstimated = true;
    const averagePoints = story.participantEstimations.map(p => p.storyPoints).reduce((a, b) => a + b, 0) / story.participantEstimations.length
    story.storyPoints = await roundupPoints(game.votingSystemId,averagePoints)
  }
}

export function setEstimation(game: Game, name: string, storyPoints:number) {
  const story = getStoryById(game, game.currentStoryId);
  const pe = story.participantEstimations.find( e => e.name === name);
  if(pe){
    pe.storyPoints = storyPoints
  }else{
    const pe ={
      name, storyPoints
    }
    story.participantEstimations.push(pe);
  }
}

export async function processGameUpdate(gameId:string,action:(game:Game)=>void){
  const game = await gameCache.get(gameId);
  if (!game) {
    return
  }
  action(game);
  await gameCache.update(game);
  EmitGameChange(game);
}
