import { Points } from '../../data/gql';
import { PointsPopup } from './PointsPopup';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { useState } from 'react';

export interface IStoryLevelPointsCardProps {
  showPoints: boolean;
  storyPoints: number;
  sendJsonMessage: SendJsonMessage;
  getDisplay: (id: number) => String | undefined;
  isAdmin: boolean;
  points: Points[];
}

export function StoryLevelPointsCard(props: IStoryLevelPointsCardProps) {
  const { showPoints, storyPoints, sendJsonMessage } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const onAction = (isSaved: boolean, value: number) => {
    if (isSaved) {
      const message = {
        code: 'updatePoints',
        points: value,
      };
      sendJsonMessage(message);
    }
    setModalOpen(false);
  };
  return (
    <>
      <div className="shadow stats">
        <div className="stat place-items-center place-content-center">
          <div className="stat-title">Story Points</div>
          <div className="stat-value" data-testid="points-card-story-points">
            {showPoints ? props.getDisplay(storyPoints) : 'Flip'}
          </div>

          <div className="stat-desc">
            {showPoints && props.isAdmin ? (
              <button
                type="button"
                className="link link-primary"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Override
              </button>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
      <PointsPopup initialValue={storyPoints} isOpen={isModalOpen} onAction={onAction} points={props.points} />
    </>
  );
}
