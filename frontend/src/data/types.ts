export interface Participant {
  name: String;
  isConnected: boolean;
}
export interface ParticipantEstimation {
  name: String;
  storyPoints: number;
}
export interface Story {
  description: String;
  id: String;
  isEstimated: boolean;
  storyPoints: number;
  participantEstimations: ParticipantEstimation[];
  areCardsOpen: boolean;
}
export interface Game {
  idString: String;
  name: String;
  stories: Story[];
  participants: Participant[];
  didGameStart: boolean;
  controllerName: String;
  currentStoryId: String;
}

export interface Message {
  code: String;
  id?: String;
  text: String;
  points: number;
}
