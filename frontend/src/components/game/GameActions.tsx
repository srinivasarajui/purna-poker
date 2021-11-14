import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import FlipIcon from '../../icons/FlipIcon';
import NextIcon from '../../icons/NextIcon';
import PreviousIcon from '../../icons/PreviousIcon';
import ResetIcon from '../../icons/ResetIcon';

export interface IGameActionsProps {
  sendJsonMessage: SendJsonMessage;
  id: String;
  disableFlip: boolean;
}

export function GameActions(props: IGameActionsProps) {
  return (
    <div className="flex items-center gap-4 flex-cols justify-items-center">
      <div className="btn-group">
        <button
          type="button"
          data-testid="game-actions-previous-story"
          className="btn btn-xs sm:btn-sm md:btn-md"
          onClick={() => {
            props.sendJsonMessage({
              code: 'moveToPreviousStory',
            });
          }}
        >
          <PreviousIcon />
          Previous Story
        </button>
        <button
          type="button"
          className="btn btn-xs sm:btn-sm md:btn-md"
          data-testid="game-actions-next-story"
          onClick={() => {
            props.sendJsonMessage({
              code: 'moveToNextStory',
            });
          }}
        >
          Next Story
          <NextIcon />
        </button>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-xs sm:btn-sm md:btn-md"
          data-testid="game-actions-flip"
          disabled={props.disableFlip}
          onClick={() => {
            props.sendJsonMessage({
              code: 'flipPoints',
              id: props.id,
            });
          }}
        >
          <FlipIcon />
          Flip Cards
        </button>
        <button
          type="button"
          className="btn btn-xs sm:btn-sm md:btn-md"
          disabled={props.disableFlip}
          data-testid="game-actions-reset"
          onClick={() => {
            props.sendJsonMessage({
              code: 'resetPoints',
            });
          }}
        >
          <ResetIcon />
          Reset Cards
        </button>
      </div>
    </div>
  );
}
