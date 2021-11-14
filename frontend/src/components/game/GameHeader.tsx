import CopyToClipBoardButton from '../common/CopyToClipBoardButton';
import EditIcon from '../../icons/EditIcon';
import { Game } from '../../data/types';
import PlayIcon from '../../icons/PlayIcon';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import StopIcon from '../../icons/StopIcon';
import { TextInputPopup } from './TextInputPopup';
import { useState } from 'react';

export interface IGameHeaderProps {
  game: Game;
  userName: String;
  statusCode: String;
  sendJsonMessage: SendJsonMessage;
}

export function GameHeader(props: IGameHeaderProps) {
  const [initialText, setInitialText] = useState<String>('');
  const [isModalOpen, setModalOpen] = useState(false);

  const onAction = (isSaved: boolean, text: String) => {
    if (isSaved) {
      const message = {
        code: 'changeGameName',
        text,
      };
      props.sendJsonMessage(message);
    }
    setModalOpen(false);
  };
  return (
    <div className="flex flex-col space-x-2 md:flex-row">
      <div className="flex flex-col flex-grow space-y-4">
        <div className="text-lg font-bold" data-testid="game-header-name">
          {props.game.name}{' '}
          <button
            type="button"
            className="btn-xs"
            onClick={() => {
              setModalOpen(true);
              setInitialText(props.game.name);
            }}
          >
            <EditIcon />
          </button>
        </div>
        <div className="text-sm" data-testid="game-header-code">
          Game code: {props.game.idString} <CopyToClipBoardButton text={props.game.idString} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="px-4 mx-8 indicator place-items-center">
          <div
            id="game-header-status-indicator"
            className={`indicator-item indicator-middle indicator-start badge ${
              props.statusCode === 'Connected' ? 'badge-success' : 'badge-warning'
            }`}
          />
          <div className="place-items-center" data-testid="game-header-status-text">
            {props.statusCode}
          </div>
        </div>

        {props.game.didGameStart ? (
          <button
            type="button"
            className="btn"
            disabled={props.game.stories.length === 0}
            onClick={() => {
              props.sendJsonMessage({
                code: 'stopGame',
              });
            }}
          >
            <StopIcon />
            stop the Game
          </button>
        ) : (
          <button
            type="button"
            className="btn"
            disabled={props.game.stories.length === 0}
            onClick={() => {
              props.sendJsonMessage({
                code: 'startGame',
                text: props.userName,
              });
            }}
          >
            <PlayIcon />
            Start the Game
          </button>
        )}
      </div>
      {isModalOpen && (
        <TextInputPopup placeHolder="Name" isOpen={isModalOpen} initialText={initialText || ''} onAction={onAction} />
      )}
    </div>
  );
}
