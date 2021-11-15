import FlipIcon from '../../icons/FlipIcon';
import NextIcon from '../../icons/NextIcon';
import PreviousIcon from '../../icons/PreviousIcon';
import ResetIcon from '../../icons/ResetIcon';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';

export interface IGameActionsProps {
  sendJsonMessage: SendJsonMessage;
  id: String;
  disableFlip: boolean;
}

export function GameActions(props: IGameActionsProps) {
  const btnClassName = 'btn btn-sm sm:btn-md md:btn-md lg:btn-lg';
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row justify-items-center">
      <div className="btn-group">
        <button
          type="button"
          data-testid="game-actions-previous-story"
          className={btnClassName}
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
          className={btnClassName}
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
          className={btnClassName}
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
          className={btnClassName}
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
