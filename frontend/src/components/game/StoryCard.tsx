import DeleteIcon from '../../icons/DeleteIcon';
import EditIcon from '../../icons/EditIcon';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { Story } from '../../data/types';
import { TextInputPopup } from './TextInputPopup';
import { useState } from 'react';

export interface IStoryCardProps {
  story: Story;
  sendJsonMessage: SendJsonMessage;
  getDisplay: (id: number) => String | undefined;
  isActive: boolean;
}
const StoryCard = (props: IStoryCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const deleteAction = () => {
    const message = {
      code: 'deleteStory',
      id: props.story.id,
    };
    props.sendJsonMessage(message);
  };
  const onAction = (isSaved: boolean, text: String) => {
    if (isSaved) {
      const message = {
        code: 'updateStoryDesc',
        id: props.story.id,
        text,
      };
      props.sendJsonMessage(message);
    }
    setModalOpen(false);
  };
  return (
    <>
      <div
        className={'shadow-2xl card compact ' + (props.isActive ? ' bg-primary text-primary-content ' : 'bg-base-100')}
      >
        <div className="card-body">
          <p data-testid="story-description">{props.story.description}</p>

          <div className="flex flex-row card-actions">
            <div className="badge badge-primary badge-outline" data-testid="story-points">
              {props.story.isEstimated
                ? `Estimated Points :${props.getDisplay(props.story.storyPoints)}`
                : 'Not Estimated yet'}
            </div>

            <div className="flex flex-grow" />
            <div>
              <button
                data-testid="story-card-story-edit"
                type="button"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <EditIcon />
              </button>
              {props.isActive || (
                <button
                  data-testid="story-card-story-delete"
                  type="button"
                  onClick={() => {
                    deleteAction();
                  }}
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TextInputPopup
          placeHolder="Story Description"
          isOpen={isModalOpen}
          initialText={props.story.description}
          onAction={onAction}
        />
      )}
    </>
  );
};
export default StoryCard;
