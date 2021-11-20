import { useEffect, useState } from 'react';
import { useGetVotingSystems, useNewGameMutation } from '../../data/gql';

import { CopyCodes } from '../common/CopyCode';
import Modal from '../common/Modal';
import { useRouter } from '../../data/routerUtil';

export interface ICreateGameProps {}

export function CreateGame(props: ICreateGameProps) {
  const { loading, vs } = useGetVotingSystems();
  const [newGame, { data }] = useNewGameMutation();
  const { goToGamePage } = useRouter();
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [gameID, setGameID] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [userName, setUserName] = useState('');
  const [name, setGameName] = useState('');
  const [votingSystemCode, setVotingSystem] = useState('fib');

  useEffect(() => {
    if (data) {
      setGameID(data.newGame.idString.toString());
      setAdminCode(data.newGame.adminCode.toString());
    }
  }, [data]);
  useEffect(() => {
    if (userName.trim().length > 0 && name.trim().length > 0 && votingSystemCode.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [setButtonDisabled, userName, name, votingSystemCode]);

  const onNewClick = async () => {
    newGame({ variables: { name: name.trim(), code: votingSystemCode, participantName: userName } });
    setModalOpen(true);
  };
  const onModalAction = () => {
    goToGamePage(gameID, userName);
    setModalOpen(false);
  };

  return (
    <div className="grid flex-grow h-auto card rounded-box place-items-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div>Create a new game code</div>
        <div>
          <div className="form-control">
            <label className="justify-center label">
              <span className="label-text" id="">
                Username
              </span>
            </label>
            <input
              type="text"
              aria-labelledby="create-game-username"
              id="create-game-username"
              data-testid="create-game-username"
              className="input input-bordered"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="form-control">
            <label className="justify-center label">
              <span className="label-text" id="create-game-name">
                Game Description
              </span>
            </label>
            <textarea
              data-testid="create-game-name"
              className="w-full pr-16 textarea textarea-bordered"
              value={name}
              aria-labelledby="create-game-name"
              onChange={(e) => setGameName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="form-control">
            <label className="justify-center label">
              <span className="label-text">Voting System</span>
            </label>
            <select
              className="w-full max-w-xs select select-bordered"
              onChange={(event) => setVotingSystem(event.target.value)}
              data-testid="create-game-voting-system"
              aria-labelledby="launch-admin-code"
              value={votingSystemCode}
            >
              {loading ? (
                <option disabled>Loading options</option>
              ) : (
                vs?.votingSystems.map((d) => (
                  <option key={d.code.toString()} value={d.code.toString()}>
                    {d.displayText}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <button
          className="btn"
          type="button"
          disabled={isButtonDisabled}
          onClick={onNewClick}
          data-testid="landing-newgame"
        >
          Create a New Game
        </button>
      </div>
      <Modal isOpen={isModalOpen} onActionClick={onModalAction} disableCloseButton={!gameID}>
        {gameID ? (
          <>
            <div>This is the code for game you created just now</div>
            <div>Game Code: {gameID}</div>
            <div>Admin Code: {adminCode}</div>

            <div>Please save this for your use later</div>
            <CopyCodes isAdmin={true} gameId={gameID} adminCode={adminCode} />
          </>
        ) : (
          <div>Game is being Generated</div>
        )}
      </Modal>
    </div>
  );
}
