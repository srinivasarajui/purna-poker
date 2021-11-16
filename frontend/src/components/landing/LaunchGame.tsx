import { useEffect, useState } from 'react';

import Alert from '../common/Alert';
import { addParticipantMutation } from '../../data/gql';
import { useRouter } from '../../data/routerUtil';

export interface ILaunchGameProps {
  isPreset?: boolean;
  gameID?: string;
  adminCode?: string;
}

export function LaunchGame(props: ILaunchGameProps) {
  const { goToGamePage } = useRouter();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [gameID, setGameID] = useState(props.gameID || '');
  const [userName, setUserName] = useState('');
  const [adminCode, setAdminCode] = useState(props.adminCode || '');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [touched, setDidTouch] = useState(false);
  const onGoClick = async () => {
    setButtonDisabled(true);
    setErrorMessage(['GameID is being validated']);
    const isValid = await addParticipantMutation(gameID, userName, adminCode);
    if (isValid) {
      goToGamePage(gameID, userName);
    } else {
      setErrorMessage(['GameID is not valid']);
    }
  };
  useEffect(() => {
    if (userName.length > 0 && gameID.match(/^[0-9a-fA-F]{24}$/)) {
      setButtonDisabled(false);
      setErrorMessage([]);
    } else {
      setButtonDisabled(true);
      if (touched) {
        let msg: string[] = [];
        if (userName.length === 0) {
          msg.push('User name can not be empty');
        }
        if (!gameID.match(/^[0-9a-fA-F]{24}$/)) {
          msg.push('Game code do not seem to be valid');
        }
        setErrorMessage(msg);
      }
    }
  }, [setButtonDisabled, userName, gameID, touched]);

  return (
    <div className="flex-grow h-auto place-items-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div>Join an existing Game</div>
        <div className="form-control">
          <label className="justify-center label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            data-testid="launch-game-username"
            className="input input-bordered"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setDidTouch(true);
            }}
          />
        </div>
        <div className="form-control">
          <label className="justify-center label">
            <span className="label-text">Game code</span>
          </label>
          <input
            type="text"
            data-testid="launch-game-code"
            className="w-full pr-16 input input-bordered"
            disabled={props.isPreset}
            value={gameID}
            onChange={(e) => {
              setGameID(e.target.value);
              setDidTouch(true);
            }}
          />
        </div>

        <div className="form-control">
          <label className="justify-center label">
            <span className="label-text">Admin code(optional)</span>
          </label>
          <input
            type="text"
            data-testid="launch-game-code"
            className="w-full pr-16 input input-bordered"
            disabled={props.isPreset}
            value={adminCode}
            onChange={(e) => {
              setAdminCode(e.target.value);
              setDidTouch(true);
            }}
          />
        </div>

        <div></div>
        <div>
          <button
            data-testid="landing-go"
            disabled={isButtonDisabled}
            type="button"
            className="btn"
            onClick={onGoClick}
          >
            go to Game Details
          </button>
        </div>
        {errorMessage.length > 0 && (
          <div>
            <Alert>
              {errorMessage.map((m) => (
                <p key={m}>{m}</p>
              ))}
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
