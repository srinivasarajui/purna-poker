import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { Story } from '../../data/types';
import StoryCard from './StoryCard';

export interface IStoriesListProps {
  stories: Story[];
  sendJsonMessage: SendJsonMessage;
  getDisplay: (id: number) => String | undefined;
}

export function StoriesList(props: IStoriesListProps) {
  return (
    <>
      {props.stories.map((story) => (
        <StoryCard
          getDisplay={props.getDisplay}
          key={story.id.toString()}
          story={story}
          sendJsonMessage={props.sendJsonMessage}
        />
      ))}
    </>
  );
}
