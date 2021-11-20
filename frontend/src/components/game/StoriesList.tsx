import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { Story } from '../../data/types';
import StoryCard from './StoryCard';

export interface IStoriesListProps {
  stories: Story[];
  currentStoryId?: String;
  sendJsonMessage: SendJsonMessage;
  getDisplay: (id: number) => String | undefined;
  isAdmin: boolean;
}

export function StoriesList(props: IStoriesListProps) {
  return (
    <>
      {props.stories.map((story) => (
        <StoryCard
          getDisplay={props.getDisplay}
          key={story.id.toString()}
          story={story}
          isActive={story.id === props.currentStoryId}
          sendJsonMessage={props.sendJsonMessage}
          isAdmin={props.isAdmin}
        />
      ))}
    </>
  );
}
