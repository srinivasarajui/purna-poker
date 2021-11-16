import { Game, Story } from './types';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { getWsURL } from './urlUtil';

const statusMap = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Connected',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

export default function useGameSocket(userName: String, gameId: String) {
  const socketUrl = `${getWsURL()}/${userName}/${gameId}`;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });
  const [game, setGame] = useState<Game>();
  const [story, setStory] = useState<Story>();
  const [statusCode, setStatusCode] = useState<String>();
  const [storyPointsSelected, setStoryPointsSelected] = useState(-3);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLast, setIsLast] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    if (lastJsonMessage !== null) {
      const g = lastJsonMessage as Game;
      setGame(g);
      const index = g.stories.findIndex((s1) => s1.id === g.currentStoryId);
      if (index !== -1) {
        setStory(g.stories[index]);
        setIsLast(index === g.stories.length - 1);
        setIsFirst(index === 0);
        const pe = g.stories[index].participantEstimations.find((p) => p.name === userName);
        setStoryPointsSelected(!pe ? -3 : pe?.storyPoints);
      }
      setIsAdmin(g.participants.find((p) => p.name === userName)?.isAdmin || false);
    }
  }, [lastJsonMessage, setGame, setStory, userName]);
  useEffect(() => setStatusCode(statusMap[readyState]), [readyState]);
  return { sendJsonMessage, game, story, storyPointsSelected, statusCode, isAdmin, isLast, isFirst };
}
