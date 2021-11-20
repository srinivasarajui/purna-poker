import EditIcon from '../../icons/EditIcon';
import { Game } from '../../data/types';
import PlayIcon from '../../icons/PlayIcon';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import StopIcon from '../../icons/StopIcon';
import { TextInputPopup } from './TextInputPopup';
import { useState } from 'react';
import { CopyCodes } from '../common/CopyCode';

export interface IGameHeaderProps {
  game: Game;
  userName: String;
  isAdmin: boolean;
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
          {props.isAdmin && (
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
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <CopyCodes adminCode={props.game.adminCode} isAdmin={props.isAdmin} gameId={props.game.idString} />
        {props.isAdmin &&
          (props.game.didGameStart ? (
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
          ))}
      </div>
      {isModalOpen && (
        <TextInputPopup placeHolder="Name" isOpen={isModalOpen} initialText={initialText || ''} onAction={onAction} />
      )}
    </div>
  );
}
