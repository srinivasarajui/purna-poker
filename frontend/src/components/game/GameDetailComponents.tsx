import { useContext, useEffect, useState } from 'react';

import Alert from '../common/Alert';
import { GameActions } from './GameActions';
import { GameHeader } from './GameHeader';
import { PointsDisplay } from './PointsDisplay';
import { SocketContext } from '../../context/ScoketContext';
import { StoryLevelPointsCard } from './StoryLevelPointsCard';
import StoryManager from './StoryManager';
import { StoryPointButtons } from './StoryPointButtons';
import useGameSocket from '../../data/socket';
import { useGetVotingSystem } from '../../data/gql';

export interface IGameDetailCompProps {
  gameId: String;
  userName: String;
}

export function GameDetailComp(props: IGameDetailCompProps) {
  const { sendJsonMessage, game, story, storyPointsSelected, statusCode, isAdmin, isLast, isFirst } = useGameSocket(
    props.userName,
    props.gameId
  );
  const { setStatusCode } = useContext(SocketContext);
  useEffect(() => {
    setStatusCode(statusCode || 'not connected');
  }, [statusCode, setStatusCode]);
  const { loading, data, getDisplay } = useGetVotingSystem(props.gameId);

  if (game && !loading) {
    return (
      <div className="flex-grow h-full">
        <div className="flex flex-col md:flex-row md:h-full">
          <div className="flex flex-col gap-4 p-1 m-1 space-x-4 space-y-4 md:flex-col md:w-2/3">
            <GameHeader
              game={game}
              sendJsonMessage={sendJsonMessage}
              statusCode={statusCode || 'loading'}
              userName={props.userName}
              isAdmin={isAdmin}
            />
            {game.didGameStart && story ? (
              <>
                {isAdmin && (
                  <div>
                    <GameActions
                      sendJsonMessage={sendJsonMessage}
                      id={story.id}
                      disableFlip={story.participantEstimations.length === 0}
                      disableNext={isLast}
                      disablePrevious={isFirst}
                    />
                  </div>
                )}
                <div className="flex flex-col md:flex-row">
                  <div className="text-lg font-bold md:flex-grow">{story.description}</div>
                  <StoryLevelPointsCard
                    isAdmin={isAdmin}
                    getDisplay={getDisplay}
                    storyPoints={story.storyPoints}
                    points={data?.votingSystem.points || []}
                    showPoints={story.isEstimated}
                    sendJsonMessage={sendJsonMessage}
                  />
                </div>
                <div className="flex flex-col items-center justify-items-center">
                  <StoryPointButtons
                    currentPoints={storyPointsSelected}
                    points={data?.votingSystem.points ? data?.votingSystem.points : []}
                    buttonClicked={(value: number) => {
                      sendJsonMessage({
                        code: 'setEstimation',
                        id: game.currentStoryId,
                        points: value,
                      });
                    }}
                  />
                </div>

                <div className="h-2/5">
                  <PointsDisplay
                    getDisplay={getDisplay}
                    story={story}
                    participants={game.participants}
                    didGameStart={game.didGameStart}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="text-lg font-bold">Game is yet to start</div>
                <div className="h-2/5">
                  <PointsDisplay
                    getDisplay={getDisplay}
                    story={story}
                    participants={game.participants}
                    didGameStart={game.didGameStart}
                  />
                </div>
              </>
            )}
          </div>
          <div className="h-full md:w-1/3">
            <StoryManager
              getDisplay={getDisplay}
              stories={game.stories}
              sendJsonMessage={sendJsonMessage}
              isAdmin={isAdmin}
              currentStoryId={story?.id}
            ></StoryManager>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Alert>
      <p>Loading .....</p>
      <p>{statusCode}</p>
    </Alert>
  );
}
