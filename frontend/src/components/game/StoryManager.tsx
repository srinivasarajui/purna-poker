import AddIcon from '../../icons/AddIcon';
import DownloadCsvButton from './DownloadCsvButton';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { StoriesList } from './StoriesList';
import { Story } from '../../data/types';
import { TextInputPopup } from './TextInputPopup';
import { useState } from 'react';

export interface IStoryManagerProps {
  stories: Story[];
  sendJsonMessage: SendJsonMessage;
  getDisplay: (id: number) => String | undefined;
  isAdmin: boolean;
  currentStoryId?: String;
}

export default function StoryManager(props: IStoryManagerProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [initialText, setInitialText] = useState<String>('');
  const onAction = (isSaved: boolean, text: String) => {
    if (isSaved) {
      const message = {
        code: 'addStory',
        text,
      };
      props.sendJsonMessage(message);
    }
    setModalOpen(false);
  };
  return (
    <div>
      <div className="flex flex-col h-full gap-2 ">
        {props.isAdmin ? (
          <>
            <button
              type="button"
              className="btn"
              data-testid="story-manager-add-stories"
              onClick={() => {
                setModalOpen(true);
                setInitialText('');
              }}
            >
              <AddIcon />
              Add a new story
            </button>
          </>
        ) : (
          <div className="text-2xl font-bold">Stories</div>
        )}
        <div className="flex flex-col flex-grow h-full max-h-full gap-2 overflow-y-auto">
          <StoriesList
            getDisplay={props.getDisplay}
            stories={props.stories}
            sendJsonMessage={props.sendJsonMessage}
            currentStoryId={props.currentStoryId}
            isAdmin={props.isAdmin}
          />
        </div>
        {props.isAdmin && <DownloadCsvButton stories={props.stories} />}
      </div>
      {isModalOpen && (
        <TextInputPopup
          placeHolder={'New Story Description'}
          isOpen={isModalOpen}
          initialText={initialText || ''}
          onAction={onAction}
        />
      )}
    </div>
  );
}
